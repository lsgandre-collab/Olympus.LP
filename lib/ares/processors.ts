// ============================================================
// ARES Backend — Data Processors
// Transforms raw Keepa data into clean JSON for the extension.
// Ported from extension's lib/keepa.ts (extractPriceHistory,
// extractCompetitors, analyzeBuyBox, evaluateListing, etc.)
// ============================================================

import {
  KeepaCSVType,
  type KeepaProduct,
  type KeepaOffer,
  keepaTimeToISO,
  keepaTimeToDate,
  keepaPriceToBRL,
  parseCSVHistory,
} from './keepa-client'

import type {
  AresProductData,
  AresPriceHistoryData,
  AresRankHistoryData,
  AresSalesHistoryData,
  AresOffersHistoryData,
  AresOpportunityData,
  PriceHistoryPoint,
  RankHistoryPoint,
  OffersHistoryPoint,
  MonthlySalesPoint,
} from './types'

// ── Product Processor ──────────────────────────────────────

export function processProduct(product: KeepaProduct): AresProductData {
  const stats = product.stats
  const competitors = extractCompetitors(product)
  const listingScore = evaluateListingScores(product)
  const buyBoxInfo = extractBuyBoxInfo(product)

  return {
    asin: product.asin,
    title: product.title || '',
    brand: product.brand || '',
    manufacturer: product.manufacturer || '',
    productGroup: product.productGroup || '',
    categories: product.categoryTree || [],
    detectedCategory: detectCategory(product),
    images: extractImages(product),
    features: product.features || [],
    description: product.description || '',

    pricing: {
      amazon: stats?.current?.[KeepaCSVType.AMAZON]
        ? keepaPriceToBRL(stats.current[KeepaCSVType.AMAZON])
        : null,
      buyBox: stats?.buyBoxPrice ? keepaPriceToBRL(stats.buyBoxPrice) : null,
      buyBoxShipping: stats?.buyBoxShipping ? keepaPriceToBRL(stats.buyBoxShipping) : null,
      newFBA: stats?.current?.[KeepaCSVType.FBA]
        ? keepaPriceToBRL(stats.current[KeepaCSVType.FBA])
        : null,
      newFBM: stats?.current?.[KeepaCSVType.FBM_PLUS_SHIPPING]
        ? keepaPriceToBRL(stats.current[KeepaCSVType.FBM_PLUS_SHIPPING])
        : null,
      used: stats?.current?.[KeepaCSVType.MARKETPLACE_USED]
        ? keepaPriceToBRL(stats.current[KeepaCSVType.MARKETPLACE_USED])
        : null,
    },

    stats: {
      avg30: {
        amazon: stats?.avg30?.[KeepaCSVType.AMAZON]
          ? keepaPriceToBRL(stats.avg30[KeepaCSVType.AMAZON])
          : null,
        buyBox: stats?.avg30?.[KeepaCSVType.BUY_BOX]
          ? keepaPriceToBRL(stats.avg30[KeepaCSVType.BUY_BOX])
          : null,
        fba: stats?.avg30?.[KeepaCSVType.FBA]
          ? keepaPriceToBRL(stats.avg30[KeepaCSVType.FBA])
          : null,
      },
      avg90: {
        amazon: stats?.avg90?.[KeepaCSVType.AMAZON]
          ? keepaPriceToBRL(stats.avg90[KeepaCSVType.AMAZON])
          : null,
        buyBox: stats?.avg90?.[KeepaCSVType.BUY_BOX]
          ? keepaPriceToBRL(stats.avg90[KeepaCSVType.BUY_BOX])
          : null,
        fba: stats?.avg90?.[KeepaCSVType.FBA]
          ? keepaPriceToBRL(stats.avg90[KeepaCSVType.FBA])
          : null,
      },
      salesRankCurrent: stats?.current?.[KeepaCSVType.SALES_RANK] ?? null,
      salesRankDrops30: stats?.salesRankDrops30 || 0,
      salesRankDrops90: stats?.salesRankDrops90 || 0,
      salesRankDrops180: stats?.salesRankDrops180 || 0,
      reviewCount: stats?.current?.[KeepaCSVType.COUNT_REVIEWS] || 0,
      rating: stats?.current?.[KeepaCSVType.RATING]
        ? stats.current[KeepaCSVType.RATING] / 10
        : 0,
      totalOfferCount: stats?.totalOfferCount || 0,
      offerCountFBA: stats?.offerCountFBA || 0,
      offerCountFBM: stats?.offerCountFBM || 0,
    },

    buyBox: buyBoxInfo,
    competitors,
    listingScore,

    fbaFees: product.fbaFees,
    dimensions: {
      packageLength: product.packageLength || 0,
      packageWidth: product.packageWidth || 0,
      packageHeight: product.packageHeight || 0,
      packageWeight: product.packageWeight || 0,
      itemWeight: product.itemWeight || 0,
    },

    hasAPlus: product.isAPlusContent || false,
    answeredQuestions: product.answeredQuestions || 0,
    frequentlyBoughtTogether: product.frequentlyBoughtTogether || [],
    lastUpdate: product.lastUpdate ? keepaTimeToISO(product.lastUpdate) : new Date().toISOString(),
  }
}

// ── Price History Processor ────────────────────────────────

export function processPriceHistory(
  product: KeepaProduct,
  days: number
): AresPriceHistoryData {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const amazonH = parseCSVHistory(product.csv?.[KeepaCSVType.AMAZON] ?? null)
  const fbaH = parseCSVHistory(product.csv?.[KeepaCSVType.FBA] ?? null)
  const fbmH = parseCSVHistory(product.csv?.[KeepaCSVType.FBM_PLUS_SHIPPING] ?? null)
  const usedH = parseCSVHistory(product.csv?.[KeepaCSVType.MARKETPLACE_USED] ?? null)
  const buyBoxH = parseCSVHistory(product.csv?.[KeepaCSVType.BUY_BOX] ?? null)

  // Merge all timelines
  const allDates = new Set<number>()
  const addDates = (arr: Array<{ date: Date }>) =>
    arr.forEach((p) => {
      if (p.date >= cutoff) allDates.add(p.date.getTime())
    })
  addDates(amazonH)
  addDates(fbaH)
  addDates(fbmH)
  addDates(usedH)
  addDates(buyBoxH)

  const sortedDates = [...allDates].sort((a, b) => a - b)

  const getValueAt = (
    history: Array<{ date: Date; value: number | null }>,
    targetTime: number
  ): number | null => {
    let lastValue: number | null = null
    for (const point of history) {
      if (point.date.getTime() <= targetTime) lastValue = point.value
      else break
    }
    return lastValue
  }

  const points: PriceHistoryPoint[] = sortedDates.map((t) => ({
    date: new Date(t).toISOString(),
    amazon: getValueAt(amazonH, t),
    newFBA: getValueAt(fbaH, t),
    newFBM: getValueAt(fbmH, t),
    used: getValueAt(usedH, t),
    buyBox: getValueAt(buyBoxH, t),
  }))

  // Summary
  const buyBoxPrices = points.map((p) => p.buyBox).filter((v): v is number => v !== null)
  const amazonPrices = points.map((p) => p.amazon).filter((v): v is number => v !== null)
  const allPrices = [...buyBoxPrices, ...amazonPrices]

  const currentPrice = buyBoxPrices.length > 0
    ? buyBoxPrices[buyBoxPrices.length - 1]
    : amazonPrices.length > 0
      ? amazonPrices[amazonPrices.length - 1]
      : null

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  const pricesAfter30d = points
    .filter((p) => new Date(p.date).getTime() <= thirtyDaysAgo)
    .map((p) => p.buyBox ?? p.amazon)
    .filter((v): v is number => v !== null)
  const price30dAgo = pricesAfter30d.length > 0
    ? pricesAfter30d[pricesAfter30d.length - 1]
    : null

  return {
    asin: product.asin,
    days,
    points,
    summary: {
      minPrice: allPrices.length > 0 ? Math.min(...allPrices) : null,
      maxPrice: allPrices.length > 0 ? Math.max(...allPrices) : null,
      avgPrice: allPrices.length > 0
        ? Math.round((allPrices.reduce((s, v) => s + v, 0) / allPrices.length) * 100) / 100
        : null,
      currentPrice,
      priceChange30d:
        currentPrice !== null && price30dAgo !== null
          ? Math.round((currentPrice - price30dAgo) * 100) / 100
          : null,
    },
  }
}

// ── Rank History Processor ─────────────────────────────────

export function processRankHistory(
  product: KeepaProduct,
  days: number
): AresRankHistoryData {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  const rankHistory = parseCSVHistory(product.csv?.[KeepaCSVType.SALES_RANK] ?? null, false)

  const points: RankHistoryPoint[] = rankHistory
    .filter((p) => p.date >= cutoff)
    .map((p) => ({
      date: p.date.toISOString(),
      rank: p.value,
    }))

  const ranks = points.map((p) => p.rank).filter((v): v is number => v !== null)

  // Trend: compare last 30% of ranks vs first 30%
  let trend: 'improving' | 'stable' | 'declining' = 'stable'
  if (ranks.length >= 10) {
    const slice = Math.floor(ranks.length * 0.3)
    const early = ranks.slice(0, slice)
    const late = ranks.slice(-slice)
    const earlyAvg = early.reduce((s, v) => s + v, 0) / early.length
    const lateAvg = late.reduce((s, v) => s + v, 0) / late.length
    // Lower rank = better sales
    if (lateAvg < earlyAvg * 0.85) trend = 'improving'
    else if (lateAvg > earlyAvg * 1.15) trend = 'declining'
  }

  return {
    asin: product.asin,
    days,
    points,
    summary: {
      currentRank: ranks.length > 0 ? ranks[ranks.length - 1] : null,
      bestRank: ranks.length > 0 ? Math.min(...ranks) : null,
      worstRank: ranks.length > 0 ? Math.max(...ranks) : null,
      avgRank: ranks.length > 0
        ? Math.round(ranks.reduce((s, v) => s + v, 0) / ranks.length)
        : null,
      trend,
    },
  }
}

// ── Sales History Processor ────────────────────────────────

export function processSalesHistory(product: KeepaProduct): AresSalesHistoryData {
  const stats = product.stats
  const rankHistory = parseCSVHistory(product.csv?.[KeepaCSVType.SALES_RANK] ?? null, false)

  // Get current price for revenue estimation
  const currentPrice = stats?.buyBoxPrice
    ? stats.buyBoxPrice / 100
    : stats?.current?.[KeepaCSVType.AMAZON]
      ? stats.current[KeepaCSVType.AMAZON] / 100
      : 0

  // Group rank drops by month to estimate monthly sales
  // Each rank drop ≈ 1 sale (simplified Jungle Scout method)
  const monthlyMap = new Map<string, { drops: number; minRank: number; maxRank: number }>()

  for (let i = 2; i < rankHistory.length; i++) {
    const current = rankHistory[i]
    const prev = rankHistory[i - 1]
    if (current.value === null || prev.value === null) continue

    const monthKey = `${current.date.getFullYear()}-${String(current.date.getMonth() + 1).padStart(2, '0')}`
    if (!monthlyMap.has(monthKey)) {
      monthlyMap.set(monthKey, { drops: 0, minRank: Infinity, maxRank: 0 })
    }
    const entry = monthlyMap.get(monthKey)!

    // A rank drop (lower number) indicates a sale
    if (current.value < prev.value) {
      entry.drops++
    }
    entry.minRank = Math.min(entry.minRank, current.value)
    entry.maxRank = Math.max(entry.maxRank, current.value)
  }

  // Also use Keepa's built-in salesRankDrops as ground truth for recent months
  const now = new Date()
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`

  // Override with Keepa's more accurate drops if available
  if (stats?.salesRankDrops30 && stats.salesRankDrops30 > 0) {
    const entry = monthlyMap.get(currentMonthKey) || { drops: 0, minRank: 0, maxRank: 0 }
    entry.drops = Math.max(entry.drops, stats.salesRankDrops30)
    monthlyMap.set(currentMonthKey, entry)
  }

  const monthlySales: MonthlySalesPoint[] = [...monthlyMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6) // Last 6 months
    .map(([month, data]) => ({
      month,
      estimatedSales: data.drops,
      estimatedRevenue: Math.round(data.drops * currentPrice),
    }))

  const totalSales6m = monthlySales.reduce((s, m) => s + m.estimatedSales, 0)
  const avgMonthlySales = monthlySales.length > 0
    ? Math.round(totalSales6m / monthlySales.length)
    : 0

  // Trend
  let salesTrend: 'growing' | 'stable' | 'declining' = 'stable'
  if (monthlySales.length >= 3) {
    const firstHalf = monthlySales.slice(0, Math.floor(monthlySales.length / 2))
    const secondHalf = monthlySales.slice(Math.floor(monthlySales.length / 2))
    const firstAvg = firstHalf.reduce((s, m) => s + m.estimatedSales, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((s, m) => s + m.estimatedSales, 0) / secondHalf.length
    if (secondAvg > firstAvg * 1.2) salesTrend = 'growing'
    else if (secondAvg < firstAvg * 0.8) salesTrend = 'declining'
  }

  const salesValues = monthlySales.map((m) => m.estimatedSales)
  const bestIdx = salesValues.indexOf(Math.max(...salesValues))
  const worstIdx = salesValues.indexOf(Math.min(...salesValues))

  return {
    asin: product.asin,
    monthlySales,
    summary: {
      totalSales6m,
      avgMonthlySales,
      salesTrend,
      bestMonth: monthlySales[bestIdx]?.month || '',
      worstMonth: monthlySales[worstIdx]?.month || '',
    },
  }
}

// ── Offers History Processor ───────────────────────────────

export function processOffersHistory(
  product: KeepaProduct,
  days: number
): AresOffersHistoryData {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const newCountH = parseCSVHistory(product.csv?.[KeepaCSVType.COUNT_NEW] ?? null, false)
  const usedCountH = parseCSVHistory(product.csv?.[KeepaCSVType.COUNT_USED] ?? null, false)
  const ratingH = parseCSVHistory(product.csv?.[KeepaCSVType.RATING] ?? null, false)
  const reviewCountH = parseCSVHistory(product.csv?.[KeepaCSVType.COUNT_REVIEWS] ?? null, false)

  // Merge timelines
  const allDates = new Set<number>()
  const addDates = (arr: Array<{ date: Date }>) =>
    arr.forEach((p) => {
      if (p.date >= cutoff) allDates.add(p.date.getTime())
    })
  addDates(newCountH)
  addDates(usedCountH)
  addDates(ratingH)
  addDates(reviewCountH)

  const sortedDates = [...allDates].sort((a, b) => a - b)

  const getValueAt = (
    history: Array<{ date: Date; value: number | null }>,
    targetTime: number
  ): number | null => {
    let lastValue: number | null = null
    for (const point of history) {
      if (point.date.getTime() <= targetTime) lastValue = point.value
      else break
    }
    return lastValue
  }

  const points: OffersHistoryPoint[] = sortedDates.map((t) => ({
    date: new Date(t).toISOString(),
    newOfferCount: getValueAt(newCountH, t),
    usedOfferCount: getValueAt(usedCountH, t),
    rating: (() => {
      const raw = getValueAt(ratingH, t)
      return raw !== null ? raw / 10 : null
    })(),
    reviewCount: getValueAt(reviewCountH, t),
  }))

  const stats = product.stats
  const currentNewOffers = stats?.offerCountFBA
    ? (stats.offerCountFBA || 0) + (stats.offerCountFBM || 0)
    : points.length > 0
      ? points[points.length - 1].newOfferCount || 0
      : 0

  const currentReviewCount = stats?.current?.[KeepaCSVType.COUNT_REVIEWS] || 0
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  const reviewsBefore = points
    .filter((p) => new Date(p.date).getTime() <= thirtyDaysAgo)
    .map((p) => p.reviewCount)
    .filter((v): v is number => v !== null)
  const reviewCount30dAgo = reviewsBefore.length > 0 ? reviewsBefore[reviewsBefore.length - 1] : 0

  // Offer trend
  let offerTrend: 'increasing' | 'stable' | 'decreasing' = 'stable'
  const newOfferValues = points
    .map((p) => p.newOfferCount)
    .filter((v): v is number => v !== null)
  if (newOfferValues.length >= 6) {
    const firstHalf = newOfferValues.slice(0, Math.floor(newOfferValues.length / 2))
    const secondHalf = newOfferValues.slice(Math.floor(newOfferValues.length / 2))
    const firstAvg = firstHalf.reduce((s, v) => s + v, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((s, v) => s + v, 0) / secondHalf.length
    if (secondAvg > firstAvg * 1.15) offerTrend = 'increasing'
    else if (secondAvg < firstAvg * 0.85) offerTrend = 'decreasing'
  }

  return {
    asin: product.asin,
    days,
    points,
    summary: {
      currentNewOffers,
      currentUsedOffers: points.length > 0
        ? points[points.length - 1].usedOfferCount || 0
        : 0,
      currentRating: stats?.current?.[KeepaCSVType.RATING]
        ? stats.current[KeepaCSVType.RATING] / 10
        : 0,
      currentReviewCount,
      reviewGrowth30d: currentReviewCount - reviewCount30dAgo,
      offerTrend,
    },
  }
}

// ── Opportunity Processor ──────────────────────────────────

export function processOpportunity(
  product: KeepaProduct,
  productCost: number,
  fulfillmentType: 'FBA' | 'FBM' = 'FBA',
  sellerPrice?: number
): AresOpportunityData {
  const stats = product.stats
  const competitors = extractCompetitors(product)
  const reasons: string[] = []

  // Monthly sales estimate from rank drops
  const monthlySalesEstimate = stats?.salesRankDrops30 || 0

  // Revenue estimate
  const currentPrice = stats?.buyBoxPrice
    ? stats.buyBoxPrice / 100
    : stats?.current?.[KeepaCSVType.AMAZON]
      ? stats.current[KeepaCSVType.AMAZON] / 100
      : 0
  const revenueEstimate = monthlySalesEstimate * currentPrice

  // Competition level
  const totalOffers = (stats?.offerCountFBA || 0) + (stats?.offerCountFBM || 0)
  let competitionLevel: AresOpportunityData['competitionLevel'] = 'low'
  if (totalOffers >= 20) competitionLevel = 'very_high'
  else if (totalOffers >= 10) competitionLevel = 'high'
  else if (totalOffers >= 5) competitionLevel = 'medium'

  // Demand trend
  const drops30 = stats?.salesRankDrops30 || 0
  const drops90 = stats?.salesRankDrops90 || 0
  const monthlyAvg90 = drops90 / 3
  let demandTrend: AresOpportunityData['demandTrend'] = 'stable'
  if (drops30 > monthlyAvg90 * 1.2) demandTrend = 'growing'
  else if (drops30 < monthlyAvg90 * 0.8) demandTrend = 'declining'

  // Ideal price
  const idealPrice = stats?.buyBoxPrice
    ? (stats.buyBoxPrice / 100) * 0.98
    : currentPrice * 0.95

  // Margin
  const estimatedFees = idealPrice * 0.15 + (fulfillmentType === 'FBA' ? 10 : 0)
  const marginAtIdealPrice = idealPrice > 0
    ? ((idealPrice - productCost - estimatedFees) / idealPrice) * 100
    : 0

  // Stock recommendation
  const stockRecommendation = Math.max(15, Math.ceil(monthlySalesEstimate * 1.5))

  // Seasonality
  const drops180 = stats?.salesRankDrops180 || 0
  const monthlyAvg180 = drops180 / 6
  const seasonality = Math.abs(drops30 - monthlyAvg180) > monthlyAvg180 * 0.5

  // Score
  let overallScore = 50
  if (monthlySalesEstimate >= 100) overallScore += 15
  else if (monthlySalesEstimate >= 30) overallScore += 10
  else if (monthlySalesEstimate < 10) overallScore -= 15

  if (marginAtIdealPrice >= 30) overallScore += 15
  else if (marginAtIdealPrice >= 20) overallScore += 10
  else if (marginAtIdealPrice < 10) overallScore -= 20

  if (competitionLevel === 'low') overallScore += 10
  else if (competitionLevel === 'very_high') overallScore -= 10

  if (demandTrend === 'growing') overallScore += 10
  else if (demandTrend === 'declining') overallScore -= 10

  overallScore = Math.max(0, Math.min(100, overallScore))

  // Verdict
  let verdict: AresOpportunityData['verdict'] = 'moderate'
  if (overallScore >= 80) verdict = 'excellent'
  else if (overallScore >= 65) verdict = 'good'
  else if (overallScore >= 40) verdict = 'moderate'
  else if (overallScore >= 20) verdict = 'risky'
  else verdict = 'avoid'

  // Reasons
  if (monthlySalesEstimate >= 50) reasons.push(`Boa demanda: ~${monthlySalesEstimate} vendas/mês`)
  else if (monthlySalesEstimate < 10) reasons.push('Demanda baixa: menos de 10 vendas/mês')
  if (marginAtIdealPrice >= 25) reasons.push(`Margem saudável: ${marginAtIdealPrice.toFixed(1)}%`)
  else if (marginAtIdealPrice < 15) reasons.push(`Margem apertada: ${marginAtIdealPrice.toFixed(1)}%`)
  if (competitionLevel === 'low') reasons.push('Pouca competição')
  else if (competitionLevel === 'very_high') reasons.push('Competição muito alta')
  if (demandTrend === 'growing') reasons.push('Demanda crescendo')
  else if (demandTrend === 'declining') reasons.push('Demanda caindo')
  if (seasonality) reasons.push('Produto sazonal — cuidado com estoque')

  // Buy Box analysis for the seller
  const buyBoxAnalysis = analyzeBuyBoxForSeller(product, competitors, sellerPrice, fulfillmentType === 'FBA')

  // Listing evaluation
  const listingEvaluation = evaluateListingDetailed(product)

  return {
    asin: product.asin,
    monthlySalesEstimate,
    revenueEstimate: Math.round(revenueEstimate),
    competitionLevel,
    demandTrend,
    idealPrice: Math.round(idealPrice * 100) / 100,
    marginAtIdealPrice: Math.round(marginAtIdealPrice * 10) / 10,
    stockRecommendation,
    seasonality,
    overallScore,
    verdict,
    reasons,
    buyBoxAnalysis,
    listingEvaluation,
  }
}

// ── Internal Helpers ───────────────────────────────────────

const CONDITION_MAP: Record<number, string> = {
  0: 'Desconhecido',
  1: 'Novo',
  2: 'Renovado',
  3: 'Usado - Como Novo',
  4: 'Usado - Muito Bom',
  5: 'Usado - Bom',
  6: 'Usado - Aceitável',
}

function extractCompetitors(product: KeepaProduct) {
  if (!product.offers) return []

  return product.offers
    .filter((o: KeepaOffer) => !o.isScam && o.price > 0)
    .map((o: KeepaOffer) => ({
      sellerId: o.sellerId,
      sellerName: o.sellerName || 'Seller desconhecido',
      price: (o.price || 0) / 100,
      shipping: (o.shipping || 0) / 100,
      totalPrice: ((o.price || 0) + (o.shipping || 0)) / 100,
      isFBA: o.isFBA,
      isPrime: o.isPrime,
      isAmazon: o.isAmazon,
      condition: CONDITION_MAP[o.condition] || 'Novo',
      lastSeen: keepaTimeToISO(o.lastSeen),
      stockEstimate: o.stockCSV ? o.stockCSV[o.stockCSV.length - 1] : undefined,
    }))
    .sort((a, b) => a.totalPrice - b.totalPrice)
}

function extractBuyBoxInfo(product: KeepaProduct) {
  const stats = product.stats
  const buyBoxCSV = product.csv?.[KeepaCSVType.BUY_BOX]
  const rotation = buyBoxCSV
    ? new Set(buyBoxCSV.filter((_, i) => i % 2 === 1).slice(-20)).size > 2
    : false

  return {
    currentWinner:
      stats?.buyBoxPrice && stats.buyBoxPrice > 0
        ? {
            sellerId: stats.sellerId || '',
            sellerName: stats.sellerName || 'Desconhecido',
            price: stats.buyBoxPrice / 100,
            shipping: (stats.buyBoxShipping || 0) / 100,
            isFBA: stats.buyBoxIsFBA || false,
            isAmazon: stats.buyBoxIsAmazon || false,
          }
        : null,
    isFBA: stats?.buyBoxIsFBA || false,
    isAmazon: stats?.buyBoxIsAmazon || false,
    rotation,
  }
}

function evaluateListingScores(product: KeepaProduct) {
  // Title
  const titleLen = product.title?.length || 0
  let titleScore = 0
  if (titleLen >= 80 && titleLen <= 200) titleScore = 90
  else if (titleLen >= 50 && titleLen <= 250) titleScore = 70
  else if (titleLen > 0) titleScore = 40

  // Images
  const imageCount = product.imagesCSV?.split(',').filter(Boolean).length || 0
  const imageScore = Math.min(100, imageCount * 14)

  // Bullets
  const bulletCount = product.features?.length || 0
  const avgBulletLen = bulletCount > 0
    ? product.features.reduce((s, f) => s + f.length, 0) / bulletCount
    : 0
  let bulletScore = Math.min(100, bulletCount * 20)
  if (avgBulletLen < 80 && bulletCount > 0) bulletScore *= 0.7

  // Description
  const descLen = product.description?.length || 0
  const hasAPlus = product.isAPlusContent || false
  const descScore = hasAPlus ? 95 : Math.min(80, descLen / 10)

  // Rating
  const ratingValue = product.stats?.current?.[KeepaCSVType.RATING]
    ? product.stats.current[KeepaCSVType.RATING] / 10
    : 0
  const reviewCount = product.stats?.current?.[KeepaCSVType.COUNT_REVIEWS] || 0
  let ratingScore = ratingValue >= 4.5 ? 95 : ratingValue >= 4.0 ? 80 : ratingValue >= 3.5 ? 60 : 30
  if (reviewCount < 10) ratingScore *= 0.5

  const overall = Math.round(
    titleScore * 0.2 + imageScore * 0.25 + bulletScore * 0.15 +
    descScore * 0.15 + ratingScore * 0.2 + Math.min(100, (product.answeredQuestions || 0) * 10) * 0.05
  )

  return { overall, title: titleScore, images: imageScore, bullets: bulletScore, description: descScore, rating: ratingScore }
}

function analyzeBuyBoxForSeller(
  product: KeepaProduct,
  competitors: ReturnType<typeof extractCompetitors>,
  sellerPrice?: number,
  isFBA = true
) {
  const stats = product.stats
  const fbaOffers = competitors.filter((c) => c.isFBA)
  const fbmOffers = competitors.filter((c) => !c.isFBA)
  const lowestFBA = fbaOffers.length > 0 ? Math.min(...fbaOffers.map((c) => c.totalPrice)) : Infinity
  const lowestFBM = fbmOffers.length > 0 ? Math.min(...fbmOffers.map((c) => c.totalPrice)) : Infinity

  const fbaDiscount = 0.97
  const priceToWin = isFBA
    ? Math.min(lowestFBA, lowestFBM * fbaDiscount) * 0.99
    : Math.min(lowestFBM, lowestFBA * (1 / fbaDiscount)) * 0.99

  let winProbability = 0
  if (sellerPrice && sellerPrice > 0) {
    const competitiveRatio = priceToWin / sellerPrice
    if (competitiveRatio >= 1) winProbability = Math.min(90, 50 + (competitiveRatio - 1) * 200)
    else winProbability = Math.max(5, 50 * competitiveRatio)
    if (isFBA) winProbability = Math.min(95, winProbability * 1.15)
    if (stats?.buyBoxIsAmazon) winProbability *= 0.6
  }

  const buyBoxCSV = product.csv?.[KeepaCSVType.BUY_BOX]
  const buyBoxRotation = buyBoxCSV
    ? new Set(buyBoxCSV.filter((_, i) => i % 2 === 1).slice(-20)).size > 2
    : false

  const recommendations: string[] = []
  if (stats?.buyBoxIsAmazon) recommendations.push('Amazon é o seller no Buy Box — competição muito difícil')
  if (!isFBA && fbaOffers.length > 0) recommendations.push('Considere FBA para vantagem no Buy Box')
  if (sellerPrice && sellerPrice > priceToWin * 1.1) recommendations.push(`Reduza o preço para ~R$${priceToWin.toFixed(2)} para competir`)
  if (competitors.length <= 3) recommendations.push('Pouca competição — boa oportunidade de Buy Box')
  if (buyBoxRotation) recommendations.push('Buy Box está rotacionando — múltiplos sellers compartilham')

  return {
    winProbability: Math.round(winProbability),
    priceToWin: Math.round(priceToWin * 100) / 100,
    fbaAdvantage: lowestFBA <= lowestFBM * 1.05,
    competitorCount: competitors.length,
    buyBoxRotation,
    recommendations,
  }
}

function evaluateListingDetailed(product: KeepaProduct) {
  const titleLen = product.title?.length || 0
  let titleScore = titleLen >= 80 && titleLen <= 200 ? 90 : titleLen >= 50 ? 70 : titleLen > 0 ? 40 : 0
  const titleSuggestions: string[] = []
  if (titleLen < 80) titleSuggestions.push('Título muito curto — inclua mais palavras-chave')
  if (titleLen > 200) titleSuggestions.push('Título muito longo — Amazon pode truncar')

  const imageCount = product.imagesCSV?.split(',').filter(Boolean).length || 0
  const imageScore = Math.min(100, imageCount * 14)
  const imageSuggestions: string[] = []
  if (imageCount < 5) imageSuggestions.push(`Adicione ${5 - imageCount} fotos (ideal: 7+)`)

  const bulletCount = product.features?.length || 0
  const avgBulletLen = bulletCount > 0 ? product.features.reduce((s, f) => s + f.length, 0) / bulletCount : 0
  let bulletScore = Math.min(100, bulletCount * 20)
  if (avgBulletLen < 80 && bulletCount > 0) bulletScore *= 0.7
  const bulletSuggestions: string[] = []
  if (bulletCount < 5) bulletSuggestions.push(`Adicione ${5 - bulletCount} bullet points (ideal: 5)`)
  if (avgBulletLen < 80 && bulletCount > 0) bulletSuggestions.push('Bullets muito curtos — detalhe benefícios')

  const hasAPlus = product.isAPlusContent || false
  const descLen = product.description?.length || 0
  const descScore = hasAPlus ? 95 : Math.min(80, descLen / 10)
  const descSuggestions: string[] = []
  if (!hasAPlus) descSuggestions.push('Sem A+ Content — considere criar para aumentar conversão')

  const ratingValue = product.stats?.current?.[KeepaCSVType.RATING] ? product.stats.current[KeepaCSVType.RATING] / 10 : 0
  const reviewCount = product.stats?.current?.[KeepaCSVType.COUNT_REVIEWS] || 0
  let ratingScore = ratingValue >= 4.5 ? 95 : ratingValue >= 4.0 ? 80 : ratingValue >= 3.5 ? 60 : 30
  if (reviewCount < 10) ratingScore *= 0.5

  const ratingHistory = parseCSVHistory(product.csv?.[KeepaCSVType.RATING] ?? null, false)
  let ratingTrend: 'up' | 'down' | 'stable' = 'stable'
  if (ratingHistory.length >= 4) {
    const recent = ratingHistory.slice(-2)
    const older = ratingHistory.slice(-4, -2)
    const recentAvg = recent.reduce((s, p) => s + (p.value || 0), 0) / recent.length
    const olderAvg = older.reduce((s, p) => s + (p.value || 0), 0) / older.length
    if (recentAvg > olderAvg + 1) ratingTrend = 'up'
    else if (recentAvg < olderAvg - 1) ratingTrend = 'down'
  }

  const overall = Math.round(
    titleScore * 0.2 + imageScore * 0.25 + bulletScore * 0.15 +
    descScore * 0.15 + ratingScore * 0.2 + Math.min(100, (product.answeredQuestions || 0) * 10) * 0.05
  )

  return {
    overallScore: overall,
    title: { score: titleScore, length: titleLen, suggestions: titleSuggestions },
    images: { score: imageScore, count: imageCount, suggestions: imageSuggestions },
    bullets: { score: bulletScore, count: bulletCount, suggestions: bulletSuggestions },
    description: { score: descScore, hasAPlus, suggestions: descSuggestions },
    rating: { score: ratingScore, value: ratingValue, count: reviewCount, trend: ratingTrend },
  }
}

function extractImages(product: KeepaProduct): string[] {
  if (!product.imagesCSV) return []
  return product.imagesCSV
    .split(',')
    .filter(Boolean)
    .map((suffix) => `https://images-na.ssl-images-amazon.com/images/I/${suffix}`)
}

function detectCategory(product: KeepaProduct): string {
  const catTree = product.categoryTree || []
  const productGroup = (product.productGroup || '').toLowerCase()
  const catNames = catTree.map((c) => c.name.toLowerCase()).join(' ')
  const combined = `${productGroup} ${catNames}`

  const categoryMap: Record<string, string[]> = {
    'eletronicos': ['eletrônic', 'electronic', 'celular', 'telefon', 'smartphone', 'tablet', 'notebook', 'computador'],
    'informatica': ['informática', 'computer', 'pc', 'laptop', 'monitor', 'teclado', 'mouse'],
    'casa': ['casa', 'home', 'cozinha', 'kitchen', 'jardim', 'garden', 'decoração'],
    'esporte': ['esporte', 'sport', 'fitness', 'academia', 'outdoor'],
    'brinquedos': ['brinquedo', 'toy', 'jogos', 'game'],
    'livros': ['livro', 'book', 'kindle', 'leitura'],
    'moda': ['moda', 'fashion', 'roupa', 'clothing', 'calçado', 'shoe', 'bolsa'],
    'beleza': ['beleza', 'beauty', 'cosmético', 'perfume', 'skin care', 'maquiagem'],
    'saude': ['saúde', 'health', 'vitamina', 'suplemento', 'medicamento'],
    'alimentos': ['alimento', 'food', 'bebida', 'drink', 'gourmet'],
    'ferramentas': ['ferramenta', 'tool', 'construção', 'industrial'],
    'automotivo': ['automotivo', 'automotive', 'carro', 'moto', 'veículo'],
    'bebe': ['bebê', 'baby', 'infantil', 'criança'],
    'pet': ['pet', 'animal', 'cachorro', 'gato'],
    'papelaria': ['papelaria', 'office', 'escritório', 'material escolar'],
  }

  for (const [catId, keywords] of Object.entries(categoryMap)) {
    if (keywords.some((kw) => combined.includes(kw))) return catId
  }

  return 'outro'
}
