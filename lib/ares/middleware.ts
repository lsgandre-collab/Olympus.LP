// ============================================================
// ARES Backend — Middleware
// CORS, rate limiting, input validation, response helpers.
// Applied to all /api/ares/* endpoints.
// ============================================================

import { NextResponse } from 'next/server'
import type { AresResponse } from './types'

// ── CORS ───────────────────────────────────────────────────

/** Allowed origins for ARES API */
const ALLOWED_ORIGINS = [
  // Chrome extension origins (dynamic, based on extension ID)
  /^chrome-extension:\/\/.+$/,
  // OLYMPUS domains
  /^https:\/\/(.*\.)?olympuslp\.vercel\.app$/,
  /^https:\/\/(.*\.)?olympus\.com\.br$/,
  /^https:\/\/(.*\.)?useolympus\.com$/,
  // Local development
  /^http:\/\/localhost(:\d+)?$/,
]

export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false
  return ALLOWED_ORIGINS.some((pattern) => pattern.test(origin))
}

export function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Ares-Extension-Id',
    'Access-Control-Max-Age': '86400',
  }

  if (origin && isOriginAllowed(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
  }

  return headers
}

/** Handle OPTIONS preflight */
export function handleCORS(request: Request): NextResponse | null {
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('origin')
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders(origin),
    })
  }
  return null
}

// ── Rate Limiting ──────────────────────────────────────────

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

/** Max requests per window (60 per minute per IP) */
const RATE_LIMIT = 60
const RATE_WINDOW = 60 * 1000 // 1 minute

/** Clean up expired entries periodically */
function cleanupRateLimit() {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key)
  }
}

// Cleanup every 5 minutes
let cleanupInterval: ReturnType<typeof setInterval> | null = null
if (!cleanupInterval) {
  cleanupInterval = setInterval(cleanupRateLimit, 5 * 60 * 1000)
}

export function checkRateLimit(request: Request): { allowed: boolean; remaining: number; resetIn: number } {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'

  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT - 1, resetIn: RATE_WINDOW }
  }

  entry.count++

  if (entry.count > RATE_LIMIT) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now }
  }

  return { allowed: true, remaining: RATE_LIMIT - entry.count, resetIn: entry.resetAt - now }
}

// ── Input Validation ───────────────────────────────────────

const ASIN_REGEX = /^[A-Z0-9]{10}$/

export function validateAsin(asin: unknown): string | null {
  if (typeof asin !== 'string') return null
  const cleaned = asin.trim().toUpperCase()
  return ASIN_REGEX.test(cleaned) ? cleaned : null
}

export function validateDomain(domain: unknown): number {
  if (typeof domain !== 'number') return 10 // Default: Brazil
  if (domain >= 1 && domain <= 13) return domain
  return 10
}

export function validateDays(days: unknown, max = 365): number {
  if (typeof days !== 'number') return 90
  return Math.max(1, Math.min(max, Math.floor(days)))
}

export function validatePositiveNumber(value: unknown, defaultVal: number): number {
  if (typeof value !== 'number' || value <= 0) return defaultVal
  return value
}

// ── Response Helpers ───────────────────────────────────────

export function successResponse<T>(
  data: T,
  extra: { tokensLeft?: number; cached?: boolean; processingTime?: number } = {},
  origin: string | null = null
): NextResponse {
  const body: AresResponse<T> = {
    success: true,
    data,
    ...extra,
  }

  return NextResponse.json(body, {
    status: 200,
    headers: {
      ...corsHeaders(origin),
      'Cache-Control': 'private, max-age=900', // 15 min
    },
  })
}

export function errorResponse(
  message: string,
  status = 400,
  origin: string | null = null
): NextResponse {
  const body: AresResponse<never> = {
    success: false,
    error: message,
  }

  return NextResponse.json(body, {
    status,
    headers: corsHeaders(origin),
  })
}

export function rateLimitResponse(resetIn: number, origin: string | null = null): NextResponse {
  return NextResponse.json(
    { success: false, error: 'Rate limit exceeded. Try again later.' },
    {
      status: 429,
      headers: {
        ...corsHeaders(origin),
        'Retry-After': String(Math.ceil(resetIn / 1000)),
        'X-RateLimit-Limit': String(RATE_LIMIT),
        'X-RateLimit-Remaining': '0',
      },
    }
  )
}

// ── Request Pipeline ───────────────────────────────────────

/**
 * Standard request pipeline for all ARES endpoints.
 * Handles CORS, rate limiting, method check, and body parsing.
 * Returns { body, origin } on success, or a NextResponse error.
 */
export async function processRequest(
  request: Request
): Promise<{ body: Record<string, unknown>; origin: string | null } | NextResponse> {
  const origin = request.headers.get('origin')

  // CORS preflight
  const corsResult = handleCORS(request)
  if (corsResult) return corsResult

  // Method check
  if (request.method !== 'POST') {
    return errorResponse('Method not allowed. Use POST.', 405, origin)
  }

  // Rate limiting
  const rateLimit = checkRateLimit(request)
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.resetIn, origin)
  }

  // Parse body
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return errorResponse('Invalid JSON body', 400, origin)
  }

  return { body, origin }
}
