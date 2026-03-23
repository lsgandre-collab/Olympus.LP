// ============================================================
// POST /api/ares/product
// Returns comprehensive product data: pricing, competitors,
// Buy Box, listing score, dimensions, etc.
// ============================================================

import { fetchKeepaProduct } from '@/lib/ares/keepa-client'
import { processProduct } from '@/lib/ares/processors'
import { getCached, setCache, buildCacheKey } from '@/lib/ares/cache'
import {
  processRequest,
  validateAsin,
  validateDomain,
  validatePositiveNumber,
  successResponse,
  errorResponse,
  corsHeaders,
} from '@/lib/ares/middleware'
import type { AresProductData } from '@/lib/ares/types'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const start = Date.now()
  const result = await processRequest(request)
  if (result instanceof NextResponse) return result

  const { body, origin } = result

  // Validate input
  const asin = validateAsin(body.asin)
  if (!asin) {
    return errorResponse('Invalid or missing ASIN (must be 10 alphanumeric chars)', 400, origin)
  }

  const domain = validateDomain(body.domain)
  const offers = validatePositiveNumber(body.offers, 20)
  const stats = validatePositiveNumber(body.stats, 180)

  // Check processed cache
  const cacheKey = buildCacheKey('product', { asin, domain, offers, stats })
  const cached = getCached<AresProductData>(cacheKey)
  if (cached) {
    return successResponse(cached, { cached: true, processingTime: Date.now() - start }, origin)
  }

  // Fetch from Keepa
  const { product, tokensLeft, error } = await fetchKeepaProduct(asin, {
    history: true,
    stats,
    offers,
    days: 90,
    buybox: true,
    rating: true,
  })

  if (!product) {
    return errorResponse(error || 'Product not found', 404, origin)
  }

  // Process
  const data = processProduct(product)
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
