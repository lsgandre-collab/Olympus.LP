// ============================================================
// ARES Backend — Keepa API Server-Side Client
// Secure proxy: API key never leaves the server.
// Mirrors extension's lib/keepa.ts but for Node/Vercel runtime.
// ============================================================

import { getCached, setCache, buildCacheKey } from './cache'

// ── Constants ──────────────────────────────────────────────

const KEEPA_API_BASE = 'https://api.keepa.com'
const KEEPA_DOMAIN_BR = 10
const CACHE_TTL = 15 * 60 * 1000 // 15 min

// ── Keepa Raw Types (from API) ─────────────────────────────

/** Keepa CSV price type indices — must match extension's KeepaCSVType */
export enum KeepaCSVType {
  AMAZON = 0,
  MARKETPLACE_NEW = 1,
  MARKETPLACE_USED = 2,
  SALES_RANK = 3,
  LISTING_SINCE = 4,
  REVIEW_COUNT_HISTORY = 5,
  BUY_BOX = 6,
  FBM_PLUS_SHIPPING = 7,
  COLLECTIBLE = 8,
  WAREHOUSE_DEALS = 9,
  FBA = 10,
  COUNT_NEW = 11,
  COUNT_USED = 12,
  COUNT_REFURBISHED = 13,
  COUNT_COLLECTIBLE = 14,
  EXTRA_RATING = 15,
  RATING = 16,
  COUNT_REVIEWS = 17,
  BUY_BOX_USED = 18,
  TRADE_IN = 19,
  RENTAL = 20,
  FBM_PRIME = 21,
  MAP = 22,
}

/** Keepa API product response (raw) */
export interface KeepaProduct {
  asin: string
  title: string
  domainId: number
  type: string
  brand: string
  manufacturer: string
  productGroup: string
  rootCategory: number
  parentAsin?: string
  variationCSV?: string
  eanList?: string[]
  upcList?: string[]
  imagesCSV: string
  description: string
  features: string[]
  packageLength: number
  packageWidth: number
  packageHeight: number
  packageWeight: number
  itemLength: number
  itemWidth: number
  itemHeight: number
  itemWeight: number
  numberOfItems: number
  numberOfPages: number
  publicationDate: number
  releaseDate: number
  lastUpdate: number
  lastPriceChange: number
  lastRatingUpdate: number
  csv: (number[] | null)[]
  categories: number[]
  categoryTree?: Array<{ catId: number; name: string }>
  stats?: KeepaStats
  offers?: KeepaOffer[]
  fbaFees?: { pickAndPackFee: number; storageFee?: number }
  salesRankReference: number
  salesRankReferenceHistory: number[]
  listingQualityScore?: number
  hazardousMaterialType?: number
  isAPlusContent?: boolean
  answeredQuestions?: number
  coupon?: number[]
  buyBoxSellerIdHistory?: string
  frequentlyBoughtTogether?: string[]
  availabilityAmazon?: number
}

export interface KeepaStats {
  current: number[]
  avg: number[][]
  avg30: number[]
  avg90: number[]
  avg180: number[]
  atIntervalStart: number[]
  min: number[][]
  max: number[][]
  minInInterval: number[]
  maxInInterval: number[]
  outOfStockPercentageInInterval: number[]
  outOfStockPercentage30: number[]
  outOfStockPercentage90: number[]
  lastOffersUpdate: number
  totalOfferCount: number
  lightningDealInfo: number[]
  salesRankDrops30: number
  salesRankDrops90: number
  salesRankDrops180: number
  buyBoxPrice: number
  buyBoxShipping: number
  buyBoxIsUnqualified: boolean
  buyBoxIsShippable: boolean
  buyBoxIsPreorder: boolean
  buyBoxIsFBA: boolean
  buyBoxIsAmazon: boolean
  buyBoxIsMAP: boolean
  buyBoxIsUsed: boolean
  buyBoxIsBackorder: boolean
  buyBoxAvailabilityMessage: string
  buyBoxMinOrderQuantity: number
  buyBoxMaxOrderQuantity: number
  buyBoxCondition: number
  buyBoxConditionNew: boolean
  sellerId: string
  sellerName: string
  isAddonItem: boolean
  sellerIdsLowestFBA: string[]
  sellerIdsLowestFBM: string[]
  offerCountFBA: number
  offerCountFBM: number
  retrievedOfferCount?: number
}

export interface KeepaOffer {
  offerId: number
  sellerId: string
  sellerName: string
  condition: number
  conditionComment?: string
  isPrime: boolean
  isFBA: boolean
  isMAP: boolean
  isShippable: boolean
  isAddonItem: boolean
  isPreorder: boolean
  isWarehouseDeal: boolean
  isScam: boolean
  shipsFromChina: boolean
  isAmazon: boolean
  isPrimeExcl: boolean
  offerCSV: number[] | null
  stockCSV?: number[]
  primeExclCSV?: number[]
  price: number
  shipping: number
  lastSeen: number
}

interface KeepaProductResponse {
  timestamp: number
  tokensLeft: number
  refillIn: number
  refillRate: number
  tokenFlowReduction: number
  products: KeepaProduct[]
  error?: { type: string; message: string }
}

// ── Token Tracking ─────────────────────────────────────────

let lastTokensLeft = 60
let lastRefillIn = 0

export function getTokensLeft(): number {
  return lastTokensLeft
}

// ── Core Fetch ─────────────────────────────────────────────

export interface FetchProductOptions {
  history?: boolean
  stats?: number
  offers?: number
  days?: number
  buybox?: boolean
  rating?: boolean
}

/**
 * Fetch a product from Keepa API (server-side).
 * Checks cache first. Returns null on error.
 */
export async function fetchKeepaProduct(
  asin: string,
  options: FetchProductOptions = {}
): Promise<{ product: KeepaProduct | null; tokensLeft: number; error?: string }> {
  const apiKey = process.env.KEEPA_API_KEY
  if (!apiKey) {
    return { product: null, tokensLeft: 0, error: 'KEEPA_API_KEY not configured' }
  }

  // Check cache
  const cacheKey = buildCacheKey('keepa_product', { asin, ...options })
  const cached = getCached<KeepaProduct>(cacheKey)
  if (cached) {
    return { product: cached, tokensLeft: lastTokensLeft }
  }

  // Build query params
  const params: Record<string, string | number> = {
    key: apiKey,
    domain: KEEPA_DOMAIN_BR,
    asin,
    history: options.history !== false ? 1 : 0,
    stats: options.stats ?? 180,
    offers: options.offers ?? 20,
    days: options.days ?? 90,
    buybox: options.buybox !== false ? 1 : 0,
    rating: options.rating !== false ? 1 : 0,
  }

  const query = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join('&')

  try {
    const res = await fetch(`${KEEPA_API_BASE}/product?${query}`, {
      headers: { 'Accept': 'application/json' },
      // Vercel serverless timeout: 10s for hobby, 60s for pro
      signal: AbortSignal.timeout(25000),
    })

    if (!res.ok) {
      return {
        product: null,
        tokensLeft: lastTokensLeft,
        error: `Keepa API HTTP ${res.status}: ${res.statusText}`,
      }
    }

    const data: KeepaProductResponse = await res.json()

    // Update token tracking
    lastTokensLeft = data.tokensLeft ?? lastTokensLeft
    lastRefillIn = data.refillIn ?? 0

    if (data.error) {
      return {
        product: null,
        tokensLeft: lastTokensLeft,
        error: `Keepa API: ${data.error.type} — ${data.error.message}`,
      }
    }

    if (!data.products || data.products.length === 0) {
      return { product: null, tokensLeft: lastTokensLeft, error: 'Product not found' }
    }

    const product = data.products[0]
    setCache(cacheKey, product, CACHE_TTL)

    return { product, tokensLeft: lastTokensLeft }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[ARES Backend] Keepa fetch error for ${asin}:`, message)
    return { product: null, tokensLeft: lastTokensLeft, error: message }
  }
}

// ── Keepa Time Helpers ─────────────────────────────────────

/** Keepa epoch: minutes since 2011-01-01 00:00 UTC */
const KEEPA_EPOCH_MS = new Date('2011-01-01T00:00:00Z').getTime()

/** Convert Keepa time (minutes since 2011-01-01) to ISO string */
export function keepaTimeToISO(keepaMinutes: number): string {
  return new Date(KEEPA_EPOCH_MS + keepaMinutes * 60000).toISOString()
}

/** Convert Keepa time to Date */
export function keepaTimeToDate(keepaMinutes: number): Date {
  return new Date(KEEPA_EPOCH_MS + keepaMinutes * 60000)
}

/** Convert Keepa price (cents, -1 = out of stock) to BRL or null */
export function keepaPriceToBRL(cents: number): number | null {
  if (cents < 0) return null
  return cents / 100
}

/** Parse Keepa CSV array (pairs of [time, value]) */
export function parseCSVHistory(
  csv: number[] | null,
  isPrice = true
): Array<{ date: Date; value: number | null }> {
  if (!csv || csv.length < 2) return []

  const points: Array<{ date: Date; value: number | null }> = []
  for (let i = 0; i < csv.length; i += 2) {
    const time = csv[i]
    const raw = csv[i + 1]
    points.push({
      date: keepaTimeToDate(time),
      value: isPrice ? keepaPriceToBRL(raw) : raw >= 0 ? raw : null,
    })
  }
  return points
}
