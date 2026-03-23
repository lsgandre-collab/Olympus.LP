// ============================================================
// ARES Backend — API Types
// Request/Response types for all ARES endpoints
// Compatible with extension types in olympus-calculator/src/types/keepa.ts
// ============================================================

// ── Request Types ────────────────────────────────────────────

/** Base request — all ARES endpoints require an ASIN */
export interface AresBaseRequest {
  asin: string
  /** Marketplace domain ID (default: 10 = BR) */
  domain?: number
}

/** POST /api/ares/product */
export interface AresProductRequest extends AresBaseRequest {
  /** Number of offers to retrieve (default: 20) */
  offers?: number
  /** Stats period in days (default: 180) */
  stats?: number
}

/** POST /api/ares/history/* */
export interface AresHistoryRequest extends AresBaseRequest {
  /** Limit history to N days (default: 90) */
  days?: number
}

/** POST /api/ares/opportunity */
export interface AresOpportunityRequest extends AresBaseRequest {
  /** Product cost in BRL for margin calculation */
  productCost: number
  /** Fulfillment type (default: FBA) */
  fulfillmentType?: 'FBA' | 'FBM'
  /** Seller price in BRL for Buy Box probability */
  sellerPrice?: number
  /** Stats period in days (default: 180) */
  stats?: number
  /** Number of offers (default: 40) */
  offers?: number
}

// ── Response Types ───────────────────────────────────────────

/** Standard API response wrapper */
export interface AresResponse<T> {
  success: boolean
  data?: T
  error?: string
  /** Keepa tokens remaining */
  tokensLeft?: number
  /** Cache hit? */
  cached?: boolean
  /** Processing time in ms */
  processingTime?: number
}

/** POST /api/ares/product response data */
export interface AresProductData {
  asin: string
  title: string
  brand: string
  manufacturer: string
  productGroup: string
  categories: Array<{ catId: number; name: string }>
  detectedCategory: string
  images: string[]
  features: string[]
  description: string

  /** Current pricing */
  pricing: {
    amazon: number | null
    buyBox: number | null
    buyBoxShipping: number | null
    newFBA: number | null
    newFBM: number | null
    used: number | null
  }

  /** Stats summary */
  stats: {
    avg30: { amazon: number | null; buyBox: number | null; fba: number | null }
    avg90: { amazon: number | null; buyBox: number | null; fba: number | null }
    salesRankCurrent: number | null
    salesRankDrops30: number
    salesRankDrops90: number
    salesRankDrops180: number
    reviewCount: number
    rating: number
    totalOfferCount: number
    offerCountFBA: number
    offerCountFBM: number
  }

  /** Buy Box analysis */
  buyBox: {
    currentWinner: {
      sellerId: string
      sellerName: string
      price: number
      shipping: number
      isFBA: boolean
      isAmazon: boolean
    } | null
    isFBA: boolean
    isAmazon: boolean
    rotation: boolean
  }

  /** Competitors list */
  competitors: Array<{
    sellerId: string
    sellerName: string
    price: number
    shipping: number
    totalPrice: number
    isFBA: boolean
    isPrime: boolean
    isAmazon: boolean
    condition: string
    lastSeen: string
    stockEstimate?: number
  }>

  /** Listing quality score */
  listingScore: {
    overall: number
    title: number
    images: number
    bullets: number
    description: number
    rating: number
  }

  /** FBA fees if available */
  fbaFees?: {
    pickAndPackFee: number
    storageFee?: number
  }

  /** Dimensions */
  dimensions?: {
    packageLength: number
    packageWidth: number
    packageHeight: number
    packageWeight: number
    itemWeight: number
  }

  /** Misc */
  hasAPlus: boolean
  answeredQuestions: number
  frequentlyBoughtTogether: string[]
  lastUpdate: string
}

/** Price history point for charts */
export interface PriceHistoryPoint {
  /** ISO date string */
  date: string
  amazon: number | null
  newFBA: number | null
  newFBM: number | null
  used: number | null
  buyBox: number | null
}

/** POST /api/ares/history/prices response data */
export interface AresPriceHistoryData {
  asin: string
  days: number
  points: PriceHistoryPoint[]
  summary: {
    minPrice: number | null
    maxPrice: number | null
    avgPrice: number | null
    currentPrice: number | null
    priceChange30d: number | null
  }
}

/** Sales rank history point */
export interface RankHistoryPoint {
  date: string
  rank: number | null
}

/** POST /api/ares/history/rank response data */
export interface AresRankHistoryData {
  asin: string
  days: number
  points: RankHistoryPoint[]
  summary: {
    currentRank: number | null
    bestRank: number | null
    worstRank: number | null
    avgRank: number | null
    trend: 'improving' | 'stable' | 'declining'
  }
}

/** Monthly sales estimate point */
export interface MonthlySalesPoint {
  /** YYYY-MM */
  month: string
  estimatedSales: number
  estimatedRevenue: number
}

/** POST /api/ares/history/sales response data */
export interface AresSalesHistoryData {
  asin: string
  monthlySales: MonthlySalesPoint[]
  summary: {
    totalSales6m: number
    avgMonthlySales: number
    salesTrend: 'growing' | 'stable' | 'declining'
    bestMonth: string
    worstMonth: string
  }
}

/** Offers/rating history point */
export interface OffersHistoryPoint {
  date: string
  newOfferCount: number | null
  usedOfferCount: number | null
  rating: number | null
  reviewCount: number | null
}

/** POST /api/ares/history/offers response data */
export interface AresOffersHistoryData {
  asin: string
  days: number
  points: OffersHistoryPoint[]
  summary: {
    currentNewOffers: number
    currentUsedOffers: number
    currentRating: number
    currentReviewCount: number
    reviewGrowth30d: number
    offerTrend: 'increasing' | 'stable' | 'decreasing'
  }
}

/** POST /api/ares/opportunity response data */
export interface AresOpportunityData {
  asin: string
  monthlySalesEstimate: number
  revenueEstimate: number
  competitionLevel: 'low' | 'medium' | 'high' | 'very_high'
  demandTrend: 'growing' | 'stable' | 'declining'
  idealPrice: number
  marginAtIdealPrice: number
  stockRecommendation: number
  seasonality: boolean
  overallScore: number
  verdict: 'excellent' | 'good' | 'moderate' | 'risky' | 'avoid'
  reasons: string[]

  /** Buy Box analysis for the seller */
  buyBoxAnalysis: {
    winProbability: number
    priceToWin: number
    fbaAdvantage: boolean
    competitorCount: number
    buyBoxRotation: boolean
    recommendations: string[]
  }

  /** Listing evaluation */
  listingEvaluation: {
    overallScore: number
    title: { score: number; length: number; suggestions: string[] }
    images: { score: number; count: number; suggestions: string[] }
    bullets: { score: number; count: number; suggestions: string[] }
    description: { score: number; hasAPlus: boolean; suggestions: string[] }
    rating: { score: number; value: number; count: number; trend: 'up' | 'down' | 'stable' }
  }
}
