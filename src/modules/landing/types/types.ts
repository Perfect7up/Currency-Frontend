export type StatItemProps = {
  label: string;
  value: string | number | undefined;
  change?: number;
};

export interface MarketOverview {
  totalMarketCap: number;
  marketCapChange: number;
  totalVolume: number;
  volumeChange: number;
  btcDominance: number;
  btcPrice: number;
  ethPrice: number;
  timestamp?: string;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  marketCapRank: number;
  marketCap: number;
  lastUpdated: string;
}

export interface PriceHistory {
  id: number;
  coinId: string;
  price: number;
  timestamp: string; // DateTime becomes ISO string
}
