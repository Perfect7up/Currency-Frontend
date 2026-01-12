/* ========= Shared ========= */

export type StatItemProps = {
  label: string;
  value: string | number | undefined;
  change?: number;
};

/* ========= Coin ========= */

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  marketCap: number;
  marketCapRank: number;
  description?: string | null;
  lastUpdated: string; // ISO date string
}

/* ========= Price History ========= */

export interface PriceHistory {
  id: number;
  coinId: string;
  price: number;
  timestamp: string; // ISO date string
}

/* ========= Market Stats ========= */

export interface MarketStats {
  coinId: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply?: number | null;
  priceChangePercentage24h: number;
}
