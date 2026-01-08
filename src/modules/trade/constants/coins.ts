export interface CoinOption {
  id: string; // API ID (e.g., 'bitcoin')
  symbol: string; // Display Symbol (e.g., 'BTC')
  name: string; // Full Name
}

export const SUPPORTED_COINS: CoinOption[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'ripple', symbol: 'XRP', name: 'Ripple' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
];

export const TIMEFRAMES = [
  { label: '1M', value: '1m' },
  { label: '5M', value: '5m' },
  { label: '1H', value: '1h' },
  { label: '1D', value: '1d' },
];
