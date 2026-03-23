// ============================================================
// ARES Backend — In-Memory Cache with TTL
// Serverless-compatible cache for Keepa API responses
// Each Vercel function instance has its own Map — shared
// across warm invocations, reset on cold start. This is fine:
// worst case is an extra Keepa API call after cold start.
// ============================================================

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

/** Default TTL: 15 minutes (Keepa data doesn't change faster) */
const DEFAULT_TTL = 15 * 60 * 1000

/** Max cache entries to prevent memory issues in serverless */
const MAX_ENTRIES = 500

const cache = new Map<string, CacheEntry<unknown>>()

/** Get cached data if not expired */
export function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined
  if (!entry) return null

  if (Date.now() - entry.timestamp > entry.ttl) {
    cache.delete(key)
    return null
  }

  return entry.data
}

/** Set data in cache with optional custom TTL */
export function setCache<T>(key: string, data: T, ttl = DEFAULT_TTL): void {
  // Evict oldest entries if at capacity
  if (cache.size >= MAX_ENTRIES) {
    const entries: Array<[string, CacheEntry<unknown>]> = []
    cache.forEach((v, k) => entries.push([k, v]))
    entries
      .sort((a, b) => a[1].timestamp - b[1].timestamp)
      .slice(0, Math.floor(MAX_ENTRIES * 0.2))
      .forEach(([k]) => cache.delete(k))
  }

  cache.set(key, { data, timestamp: Date.now(), ttl })
}

/** Build a cache key from endpoint + params */
export function buildCacheKey(endpoint: string, params: Record<string, unknown>): string {
  const sorted = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
  return `ares:${endpoint}:${sorted}`
}

/** Get cache stats for debugging */
export function getCacheStats(): { size: number; maxSize: number } {
  return { size: cache.size, maxSize: MAX_ENTRIES }
}
