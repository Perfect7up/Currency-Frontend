/* ========= Tools ========= */

export interface ConvertResult {
  value: number;
}

/* ========= Coin (used by compare) ========= */

export interface ComparedCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  marketCap: number;
  marketCapRank: number;
  description?: string | null;
  lastUpdated: string;
}
