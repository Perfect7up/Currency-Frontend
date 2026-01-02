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
  timestamp?: string | number | Date;
}
