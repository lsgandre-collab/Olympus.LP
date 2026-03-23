// ============================================================
// POST /api/ares/history/sales
// Returns estimated monthly sales derived from rank drops
// ============================================================

import { fetchKeepaProduct } from '@/lib/ares/keepa-client'
import { processSalesHistory } from '@/lib/ares/processors'
import { getCached, setCache, buildCacheKey } from '@/lib/ares/cache'
import {
  processRequest,
  validateAsin,
  validateDomain,
  successResponse,
  errorResponse,
  corsHeaders,
} from '@/lib/ares/middleware'
import type { AresSalesHistoryData } from '@/lib/ares/types'
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

  const cacheKey = buildCacheKey('history_sales', { asin, domain })
  const cached = getCached<AresSalesHistoryData>(cacheKey)
  if (cached) {
    return successResponse(cached, { cached: true, processingTime: Date.now() - start }, origin)
  }

  // Need 180+ days of history for 6-month view
  const { product, tokensLeft, error } = await fetchKeepaProduct(asin, {
    history: true,
    stats: 180,
    days: 365,
    buybox: true,
  })

  if (!product) {
    return errorResponse(error || 'Product not found', 404, origin)
  }

  const data = processSalesHistory(product)
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
