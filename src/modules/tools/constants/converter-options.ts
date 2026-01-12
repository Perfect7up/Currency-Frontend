export const ASSET_OPTIONS = [
  // Major Cryptocurrencies
  { value: 'bitcoin', label: 'Bitcoin', symbol: 'BTC' },
  { value: 'ethereum', label: 'Ethereum', symbol: 'ETH' },
  { value: 'solana', label: 'Solana', symbol: 'SOL' },
  { value: 'cardano', label: 'Cardano', symbol: 'ADA' },
  { value: 'ripple', label: 'XRP', symbol: 'XRP' },
  { value: 'polkadot', label: 'Polkadot', symbol: 'DOT' },
  { value: 'dogecoin', label: 'Dogecoin', symbol: 'DOGE' },

  // Additional Top Cryptocurrencies
  { value: 'binance-coin', label: 'BNB', symbol: 'BNB' },
  { value: 'tether', label: 'Tether', symbol: 'USDT' },
  { value: 'usd-coin', label: 'USD Coin', symbol: 'USDC' },
  { value: 'litecoin', label: 'Litecoin', symbol: 'LTC' },
  { value: 'chainlink', label: 'Chainlink', symbol: 'LINK' },
  { value: 'stellar', label: 'Stellar', symbol: 'XLM' },
  { value: 'uniswap', label: 'Uniswap', symbol: 'UNI' },
  { value: 'avalanche', label: 'Avalanche', symbol: 'AVAX' },
  { value: 'cosmos', label: 'Cosmos', symbol: 'ATOM' },
  { value: 'monero', label: 'Monero', symbol: 'XMR' },
  { value: 'algorand', label: 'Algorand', symbol: 'ALGO' },
  { value: 'vechain', label: 'VeChain', symbol: 'VET' },
  { value: 'tezos', label: 'Tezos', symbol: 'XTZ' },
  { value: 'filecoin', label: 'Filecoin', symbol: 'FIL' },
  { value: 'theta', label: 'Theta Network', symbol: 'THETA' },
  { value: 'tron', label: 'TRON', symbol: 'TRX' },
  { value: 'eos', label: 'EOS', symbol: 'EOS' },

  // Additional Altcoins
  { value: 'helium', label: 'Helium', symbol: 'HNT' },
  { value: 'aave', label: 'Aave', symbol: 'AAVE' },
  { value: 'compound', label: 'Compound', symbol: 'COMP' },
  { value: 'synthetix', label: 'Synthetix', symbol: 'SNX' },
  { value: 'maker', label: 'Maker', symbol: 'MKR' },
  { value: 'yearn-finance', label: 'Yearn Finance', symbol: 'YFI' },
  { value: 'decentraland', label: 'Decentraland', symbol: 'MANA' },
  { value: 'the-sandbox', label: 'The Sandbox', symbol: 'SAND' },
  { value: 'axie-infinity', label: 'Axie Infinity', symbol: 'AXS' },
  { value: 'enjin-coin', label: 'Enjin Coin', symbol: 'ENJ' },
  { value: 'gala', label: 'Gala', symbol: 'GALA' },
  { value: 'flow', label: 'Flow', symbol: 'FLOW' },
  { value: 'chiliz', label: 'Chiliz', symbol: 'CHZ' },
  { value: 'basic-attention-token', label: 'Basic Attention Token', symbol: 'BAT' },
  { value: 'quant', label: 'Quant', symbol: 'QNT' },
  { value: 'neo', label: 'NEO', symbol: 'NEO' },
  { value: 'zcash', label: 'Zcash', symbol: 'ZEC' },
  { value: 'dash', label: 'Dash', symbol: 'DASH' },
  { value: 'waves', label: 'Waves', symbol: 'WAVES' },
  { value: 'kusama', label: 'Kusama', symbol: 'KSM' },

  // Stablecoins
  { value: 'dai', label: 'Dai', symbol: 'DAI' },
  { value: 'true-usd', label: 'TrueUSD', symbol: 'TUSD' },
  { value: 'paxos-standard', label: 'Pax Dollar', symbol: 'USDP' },
  { value: 'binance-usd', label: 'Binance USD', symbol: 'BUSD' },

  // Meme Coins
  { value: 'shiba-inu', label: 'Shiba Inu', symbol: 'SHIB' },
  { value: 'dogelon-mars', label: 'Dogelon Mars', symbol: 'ELON' },
  { value: 'floki', label: 'Floki', symbol: 'FLOKI' },
  { value: 'baby-doge-coin', label: 'Baby Doge Coin', symbol: 'BABYDOGE' },

  // Layer 2 Solutions
  { value: 'matic-network', label: 'Polygon', symbol: 'MATIC' },
  { value: 'loopring', label: 'Loopring', symbol: 'LRC' },
  { value: 'optimism', label: 'Optimism', symbol: 'OP' },
  { value: 'arbitrum', label: 'Arbitrum', symbol: 'ARB' },

  // DeFi Tokens
  { value: 'curve-dao-token', label: 'Curve DAO Token', symbol: 'CRV' },
  { value: 'sushi', label: 'SushiSwap', symbol: 'SUSHI' },
  { value: 'pancakeswap', label: 'PancakeSwap', symbol: 'CAKE' },
  { value: '1inch', label: '1inch', symbol: '1INCH' },

  // Oracles
  { value: 'band-protocol', label: 'Band Protocol', symbol: 'BAND' },
  { value: 'api3', label: 'API3', symbol: 'API3' },
  { value: 'uma', label: 'UMA', symbol: 'UMA' },

  // Privacy Coins
  { value: 'dash', label: 'Dash', symbol: 'DASH' },
  { value: 'zcash', label: 'Zcash', symbol: 'ZEC' },
  { value: 'horizen', label: 'Horizen', symbol: 'ZEN' },

  // Gaming/Metaverse
  { value: 'illuvium', label: 'Illuvium', symbol: 'ILV' },
  { value: 'star-atlas', label: 'Star Atlas', symbol: 'ATLAS' },
  { value: 'stepn', label: 'STEPN', symbol: 'GMT' },

  // AI/Web3
  { value: 'the-graph', label: 'The Graph', symbol: 'GRT' },
  { value: 'fetch-ai', label: 'Fetch.ai', symbol: 'FET' },
  { value: 'ocean-protocol', label: 'Ocean Protocol', symbol: 'OCEAN' },
  { value: 'render-token', label: 'Render Token', symbol: 'RNDR' },

  // Storage/Infrastructure
  { value: 'arweave', label: 'Arweave', symbol: 'AR' },
  { value: 'internet-computer', label: 'Internet Computer', symbol: 'ICP' },
  { value: 'holo', label: 'Holo', symbol: 'HOT' },
  { value: 'siacoin', label: 'Siacoin', symbol: 'SC' },

  // Emerging
  { value: 'aptos', label: 'Aptos', symbol: 'APT' },
  { value: 'near-protocol', label: 'NEAR Protocol', symbol: 'NEAR' },
  { value: 'fantom', label: 'Fantom', symbol: 'FTM' },
  { value: 'harmony', label: 'Harmony', symbol: 'ONE' },
  { value: 'celo', label: 'Celo', symbol: 'CELO' },
  { value: 'klaytn', label: 'Klaytn', symbol: 'KLAY' },
  { value: 'mina-protocol', label: 'Mina Protocol', symbol: 'MINA' },
  { value: 'celestia', label: 'Celestia', symbol: 'TIA' },
  { value: 'injective', label: 'Injective', symbol: 'INJ' },
  { value: 'sei-network', label: 'Sei Network', symbol: 'SEI' },
  { value: 'sui', label: 'Sui', symbol: 'SUI' },
];

export const FIAT_OPTIONS = [
  // Major Global Currencies
  { value: 'usd', label: 'US Dollar', symbol: 'USD' },
  { value: 'eur', label: 'Euro', symbol: 'EUR' },
  { value: 'gbp', label: 'British Pound', symbol: 'GBP' },
  { value: 'jpy', label: 'Japanese Yen', symbol: 'JPY' },
  { value: 'cad', label: 'Canadian Dollar', symbol: 'CAD' },

  // Additional Major Currencies
  { value: 'aud', label: 'Australian Dollar', symbol: 'AUD' },
  { value: 'chf', label: 'Swiss Franc', symbol: 'CHF' },
  { value: 'cny', label: 'Chinese Yuan', symbol: 'CNY' },
  { value: 'hkd', label: 'Hong Kong Dollar', symbol: 'HKD' },
  { value: 'sgd', label: 'Singapore Dollar', symbol: 'SGD' },
  { value: 'sek', label: 'Swedish Krona', symbol: 'SEK' },
  { value: 'nzd', label: 'New Zealand Dollar', symbol: 'NZD' },
  { value: 'krw', label: 'South Korean Won', symbol: 'KRW' },
  { value: 'inr', label: 'Indian Rupee', symbol: 'INR' },
  { value: 'brl', label: 'Brazilian Real', symbol: 'BRL' },
  { value: 'rub', label: 'Russian Ruble', symbol: 'RUB' },
  { value: 'zar', label: 'South African Rand', symbol: 'ZAR' },
  { value: 'mxn', label: 'Mexican Peso', symbol: 'MXN' },

  // European Currencies
  { value: 'nok', label: 'Norwegian Krone', symbol: 'NOK' },
  { value: 'dkk', label: 'Danish Krone', symbol: 'DKK' },
  { value: 'pln', label: 'Polish Złoty', symbol: 'PLN' },
  { value: 'czk', label: 'Czech Koruna', symbol: 'CZK' },
  { value: 'huf', label: 'Hungarian Forint', symbol: 'HUF' },
  { value: 'ron', label: 'Romanian Leu', symbol: 'RON' },
  { value: 'try', label: 'Turkish Lira', symbol: 'TRY' },
  { value: 'isk', label: 'Icelandic Króna', symbol: 'ISK' },

  // Middle Eastern Currencies
  { value: 'aed', label: 'UAE Dirham', symbol: 'AED' },
  { value: 'sar', label: 'Saudi Riyal', symbol: 'SAR' },
  { value: 'ils', label: 'Israeli New Shekel', symbol: 'ILS' },
  { value: 'qar', label: 'Qatari Riyal', symbol: 'QAR' },
  { value: 'omr', label: 'Omani Rial', symbol: 'OMR' },
  { value: 'kwd', label: 'Kuwaiti Dinar', symbol: 'KWD' },
  { value: 'bhd', label: 'Bahraini Dinar', symbol: 'BHD' },

  // Asian Currencies
  { value: 'twd', label: 'New Taiwan Dollar', symbol: 'TWD' },
  { value: 'thb', label: 'Thai Baht', symbol: 'THB' },
  { value: 'myr', label: 'Malaysian Ringgit', symbol: 'MYR' },
  { value: 'idr', label: 'Indonesian Rupiah', symbol: 'IDR' },
  { value: 'php', label: 'Philippine Peso', symbol: 'PHP' },
  { value: 'vnd', label: 'Vietnamese Đồng', symbol: 'VND' },
  { value: 'pkr', label: 'Pakistani Rupee', symbol: 'PKR' },
  { value: 'bdt', label: 'Bangladeshi Taka', symbol: 'BDT' },
  { value: 'lkr', label: 'Sri Lankan Rupee', symbol: 'LKR' },

  // African Currencies
  { value: 'egp', label: 'Egyptian Pound', symbol: 'EGP' },
  { value: 'ngn', label: 'Nigerian Naira', symbol: 'NGN' },
  { value: 'kes', label: 'Kenyan Shilling', symbol: 'KES' },
  { value: 'ghs', label: 'Ghanaian Cedi', symbol: 'GHS' },
  { value: 'tzs', label: 'Tanzanian Shilling', symbol: 'TZS' },
  { value: 'ugx', label: 'Ugandan Shilling', symbol: 'UGX' },
  { value: 'zmw', label: 'Zambian Kwacha', symbol: 'ZMW' },

  // South American Currencies
  { value: 'ars', label: 'Argentine Peso', symbol: 'ARS' },
  { value: 'clp', label: 'Chilean Peso', symbol: 'CLP' },
  { value: 'cop', label: 'Colombian Peso', symbol: 'COP' },
  { value: 'pen', label: 'Peruvian Sol', symbol: 'PEN' },
  { value: 'uyu', label: 'Uruguayan Peso', symbol: 'UYU' },
  { value: 'bob', label: 'Bolivian Boliviano', symbol: 'BOB' },

  // Caribbean Currencies
  { value: 'ttd', label: 'Trinidad and Tobago Dollar', symbol: 'TTD' },
  { value: 'jmd', label: 'Jamaican Dollar', symbol: 'JMD' },
  { value: 'bbd', label: 'Barbadian Dollar', symbol: 'BBD' },

  // Cryptocurrency-pegged Fiats (for trading pairs)
  { value: 'usdt', label: 'Tether', symbol: 'USDT' },
  { value: 'usdc', label: 'USD Coin', symbol: 'USDC' },
  { value: 'busd', label: 'Binance USD', symbol: 'BUSD' },
  { value: 'dai', label: 'Dai', symbol: 'DAI' },

  // Other Notable Currencies
  { value: 'uah', label: 'Ukrainian Hryvnia', symbol: 'UAH' },
  { value: 'byr', label: 'Belarusian Ruble', symbol: 'BYN' },
  { value: 'kzt', label: 'Kazakhstani Tenge', symbol: 'KZT' },
  { value: 'azn', label: 'Azerbaijani Manat', symbol: 'AZN' },
  { value: 'gel', label: 'Georgian Lari', symbol: 'GEL' },
  { value: 'amd', label: 'Armenian Dram', symbol: 'AMD' },
  { value: 'kgs', label: 'Kyrgyzstani Som', symbol: 'KGS' },
  { value: 'uzs', label: 'Uzbekistani Som', symbol: 'UZS' },

  // Special Drawing Rights & Regional
  { value: 'xdr', label: 'Special Drawing Rights', symbol: 'XDR' },
  { value: 'xau', label: 'Gold (troy ounce)', symbol: 'XAU' },
  { value: 'xag', label: 'Silver (troy ounce)', symbol: 'XAG' },
];
