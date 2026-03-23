// ============================================================
// POST /api/ares/opportunity
// Full opportunity analysis: sales estimate, competition,
// margin, Buy Box probability, listing evaluation
// ============================================================

import { fetchKeepaProduct } from '@/lib/ares/keepa-client'
import { processOpportunity } from '@/lib/ares/processors'
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
import type { AresOpportunityData } from '@/lib/ares/types'
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

  // productCost is required for this endpoint
  if (typeof body.productCost !== 'number' || body.productCost <= 0) {
    return errorResponse('productCost is required and must be a positive number (BRL)', 400, origin)
  }

  const domain = validateDomain(body.domain)
  const productCost = body.productCost as number
  const fulfillmentType = body.fulfillmentType === 'FBM' ? 'FBM' : 'FBA'
  const sellerPrice = typeof body.sellerPrice === 'number' && body.sellerPrice > 0
    ? body.sellerPrice
    : undefined
  const offers = validatePositiveNumber(body.offers, 40)
  const stats = validatePositiveNumber(body.stats, 180)

  const cacheKey = buildCacheKey('opportunity', {
    asin, domain, productCost, fulfillmentType, sellerPrice, offers, stats,
  })
  const cached = getCached<AresOpportunityData>(cacheKey)
  if (cached) {
    return successResponse(cached, { cached: true, processingTime: Date.now() - start }, origin)
  }

  const { product, tokensLeft, error } = await fetchKeepaProduct(asin, {
    history: true,
    stats,
    offers,
    days: 180,
    buybox: true,
    rating: true,
  })

  if (!product) {
    return errorResponse(error || 'Product not found', 404, origin)
  }

  const data = processOpportunity(product, productCost, fulfillmentType, sellerPrice)
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
