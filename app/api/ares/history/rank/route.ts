// ============================================================
// POST /api/ares/history/rank
// Returns Sales Rank history with trend analysis
// ============================================================

import { fetchKeepaProduct } from '@/lib/ares/keepa-client'
import { processRankHistory } from '@/lib/ares/processors'
import { getCached, setCache, buildCacheKey } from '@/lib/ares/cache'
import {
  processRequest,
  validateAsin,
  validateDomain,
  validateDays,
  successResponse,
  errorResponse,
  corsHeaders,
} from '@/lib/ares/middleware'
import type { AresRankHistoryData } from '@/lib/ares/types'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const start = Date.now()
  const result = await processRequest(request)
  if (result instanceof NextResponse) return result

  const { body, origin } = result

  const asin = validateAsin(body.asin)
  if (!asin) {
    return errorResponse('Invalid or missing ASIN', 400, origin)
  }

  const domain = validateDomain(body.domain)
  const days = validateDays(body.days, 1001)

  const cacheKey = buildCacheKey('history_rank', { asin, domain, days })
  const cached = getCached<AresRankHistoryData>(cacheKey)
  if (cached) {
    return successResponse(cached, { cached: true, processingTime: Date.now() - start }, origin)
  }

  const { product, tokensLeft, error } = await fetchKeepaProduct(asin, {
    history: true,
    stats: 180,
    days: Math.min(days, 1001),
  })

  if (!product) {
    return errorResponse(error || 'Product not found', 404, origin)
  }

  const data = processRankHistory(product, days)
  setCache(cacheKey, data)

  return successResponse(data, {
    tokensLeft,
    cached: false,
    processingTime: Date.now() - start,
  }, origin)
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin')
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
}
