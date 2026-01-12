export interface CoinOption {
  id: string; // API ID (e.g., 'bitcoin')
  symbol: string; // Display Symbol (e.g., 'BTC')
  name: string; // Full Name
}

export const SUPPORTED_COINS: CoinOption[] = [
  // Tier 1: Major Cryptocurrencies
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'ripple', symbol: 'XRP', name: 'Ripple' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },

  // Tier 2: Top 20 Market Cap
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'tether', symbol: 'USDT', name: 'Tether' },
  { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'monero', symbol: 'XMR', name: 'Monero' },
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },

  // Tier 3: Major Altcoins (21-50)
  { id: 'vechain', symbol: 'VET', name: 'VeChain' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' },
  { id: 'filecoin', symbol: 'FIL', name: 'Filecoin' },
  { id: 'theta-token', symbol: 'THETA', name: 'Theta Network' },
  { id: 'tron', symbol: 'TRX', name: 'TRON' },
  { id: 'eos', symbol: 'EOS', name: 'EOS' },
  { id: 'aave', symbol: 'AAVE', name: 'Aave' },
  { id: 'compound-governance-token', symbol: 'COMP', name: 'Compound' },
  { id: 'synthetix-network-token', symbol: 'SNX', name: 'Synthetix' },
  { id: 'maker', symbol: 'MKR', name: 'Maker' },
  { id: 'yearn-finance', symbol: 'YFI', name: 'yearn.finance' },
  { id: 'decentraland', symbol: 'MANA', name: 'Decentraland' },
  { id: 'the-sandbox', symbol: 'SAND', name: 'The Sandbox' },
  { id: 'axie-infinity', symbol: 'AXS', name: 'Axie Infinity' },

  // Tier 4: Additional Popular Coins
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'polygon', symbol: 'MATIC', name: 'Polygon' },
  { id: 'near', symbol: 'NEAR', name: 'NEAR Protocol' },
  { id: 'fantom', symbol: 'FTM', name: 'Fantom' },
  { id: 'klay-token', symbol: 'KLAY', name: 'Klaytn' },
  { id: 'iota', symbol: 'MIOTA', name: 'IOTA' },
  { id: 'zcash', symbol: 'ZEC', name: 'Zcash' },
  { id: 'dash', symbol: 'DASH', name: 'Dash' },
  { id: 'waves', symbol: 'WAVES', name: 'Waves' },
  { id: 'neo', symbol: 'NEO', name: 'NEO' },
  { id: 'kusama', symbol: 'KSM', name: 'Kusama' },
  { id: 'helium', symbol: 'HNT', name: 'Helium' },

  // Tier 5: Stablecoins
  { id: 'dai', symbol: 'DAI', name: 'Dai' },
  { id: 'true-usd', symbol: 'TUSD', name: 'TrueUSD' },
  { id: 'paxos-standard', symbol: 'USDP', name: 'Pax Dollar' },
  { id: 'binance-usd', symbol: 'BUSD', name: 'Binance USD' },

  // Tier 6: DeFi Tokens
  { id: 'curve-dao-token', symbol: 'CRV', name: 'Curve DAO Token' },
  { id: 'sushi', symbol: 'SUSHI', name: 'SushiSwap' },
  { id: 'pancakeswap-token', symbol: 'CAKE', name: 'PancakeSwap' },
  { id: '1inch', symbol: '1INCH', name: '1inch Network' },
  { id: 'balancer', symbol: 'BAL', name: 'Balancer' },
  { id: '0x', symbol: 'ZRX', name: '0x Protocol' },
  { id: 'loopring', symbol: 'LRC', name: 'Loopring' },
  { id: 'uma', symbol: 'UMA', name: 'UMA' },

  // Tier 7: Gaming/Metaverse
  { id: 'enjincoin', symbol: 'ENJ', name: 'Enjin Coin' },
  { id: 'gala', symbol: 'GALA', name: 'Gala' },
  { id: 'illuvium', symbol: 'ILV', name: 'Illuvium' },
  { id: 'render-token', symbol: 'RNDR', name: 'Render Token' },
  { id: 'stepn', symbol: 'GMT', name: 'STEPN' },
  { id: 'immutable-x', symbol: 'IMX', name: 'Immutable X' },
  { id: 'gods-unchained', symbol: 'GODS', name: 'Gods Unchained' },

  // Tier 8: AI & Web3 Infrastructure
  { id: 'the-graph', symbol: 'GRT', name: 'The Graph' },
  { id: 'fetch-ai', symbol: 'FET', name: 'Fetch.ai' },
  { id: 'ocean-protocol', symbol: 'OCEAN', name: 'Ocean Protocol' },
  { id: 'singularitynet', symbol: 'AGIX', name: 'SingularityNET' },
  { id: 'numeraire', symbol: 'NMR', name: 'Numeraire' },

  // Tier 9: Layer 1 & Layer 2 Solutions
  { id: 'harmony', symbol: 'ONE', name: 'Harmony' },
  { id: 'celo', symbol: 'CELO', name: 'Celo' },
  { id: 'mina-protocol', symbol: 'MINA', name: 'Mina Protocol' },
  { id: 'celestia', symbol: 'TIA', name: 'Celestia' },
  { id: 'arbitrum', symbol: 'ARB', name: 'Arbitrum' },
  { id: 'optimism', symbol: 'OP', name: 'Optimism' },
  { id: 'aptos', symbol: 'APT', name: 'Aptos' },
  { id: 'sui', symbol: 'SUI', name: 'Sui' },
  { id: 'sei-network', symbol: 'SEI', name: 'Sei' },
  { id: 'injective-protocol', symbol: 'INJ', name: 'Injective' },

  // Tier 10: Storage & Infrastructure
  { id: 'arweave', symbol: 'AR', name: 'Arweave' },
  { id: 'internet-computer', symbol: 'ICP', name: 'Internet Computer' },
  { id: 'holotoken', symbol: 'HOT', name: 'Holo' },
  { id: 'siacoin', symbol: 'SC', name: 'Siacoin' },
  { id: 'storj', symbol: 'STORJ', name: 'Storj' },
  { id: 'ankr', symbol: 'ANKR', name: 'Ankr' },

  // Tier 11: Oracles
  { id: 'band-protocol', symbol: 'BAND', name: 'Band Protocol' },
  { id: 'api3', symbol: 'API3', name: 'API3' },
  { id: 'dia-data', symbol: 'DIA', name: 'DIA' },
  { id: 'nest-protocol', symbol: 'NEST', name: 'Nest Protocol' },

  // Tier 12: Privacy Coins
  { id: 'horizen', symbol: 'ZEN', name: 'Horizen' },
  { id: 'pirate-chain', symbol: 'ARRR', name: 'Pirate Chain' },
  { id: 'secret', symbol: 'SCRT', name: 'Secret' },
  { id: 'beam', symbol: 'BEAM', name: 'Beam' },

  // Tier 13: Meme Coins (additional)
  { id: 'dogelon-mars', symbol: 'ELON', name: 'Dogelon Mars' },
  { id: 'floki', symbol: 'FLOKI', name: 'Floki Inu' },
  { id: 'baby-doge-coin', symbol: 'BABYDOGE', name: 'Baby Doge Coin' },
  { id: 'samoyedcoin', symbol: 'SAMO', name: 'Samoyedcoin' },
  { id: 'bonk', symbol: 'BONK', name: 'Bonk' },

  // Tier 14: Social & Community Tokens
  { id: 'basic-attention-token', symbol: 'BAT', name: 'Basic Attention Token' },
  { id: 'chiliz', symbol: 'CHZ', name: 'Chiliz' },
  { id: 'decentralized-social', symbol: 'DESO', name: 'Decentralized Social' },
  { id: 'rally', symbol: 'RLY', name: 'Rally' },

  // Tier 15: Emerging & High Potential
  { id: 'casper-network', symbol: 'CSPR', name: 'Casper Network' },
  { id: 'radix', symbol: 'XRD', name: 'Radix' },
  { id: 'stacks', symbol: 'STX', name: 'Stacks' },
  { id: 'hedera-hashgraph', symbol: 'HBAR', name: 'Hedera Hashgraph' },
  { id: 'xdc-network', symbol: 'XDC', name: 'XDC Network' },
  { id: 'qtum', symbol: 'QTUM', name: 'Qtum' },
  { id: 'icon', symbol: 'ICX', name: 'ICON' },
  { id: 'ontology', symbol: 'ONT', name: 'Ontology' },
  { id: 'zilliqa', symbol: 'ZIL', name: 'Zilliqa' },

  // Tier 16: Real World Assets (RWA)
  { id: 'realio-network', symbol: 'RIO', name: 'Realio Network' },
  { id: 'propchain', symbol: 'PROPC', name: 'Propchain' },
  { id: 'landshare', symbol: 'LAND', name: 'Landshare' },

  // Tier 17: Liquid Staking Tokens
  { id: 'lido-dao', symbol: 'LDO', name: 'Lido DAO Token' },
  { id: 'rocket-pool-eth', symbol: 'RETH', name: 'Rocket Pool ETH' },
  { id: 'frax-ether', symbol: 'FRXETH', name: 'Frax Ether' },
  { id: 'staked-ether', symbol: 'STETH', name: 'Lido Staked Ether' },

  // Tier 18: Prediction Markets
  { id: 'augur', symbol: 'REP', name: 'Augur' },
  { id: 'polymarket', symbol: 'POLY', name: 'Polymarket' },

  // Tier 19: Perpetuals & Derivatives
  { id: 'dydx', symbol: 'DYDX', name: 'dYdX' },
  { id: 'gmx', symbol: 'GMX', name: 'GMX' },
  { id: 'gains-network', symbol: 'GNS', name: 'Gains Network' },
  { id: 'perpetual-protocol', symbol: 'PERP', name: 'Perpetual Protocol' },

  // Tier 20: Yield & Farming
  { id: 'convex-finance', symbol: 'CVX', name: 'Convex Finance' },
  { id: 'convex-crv', symbol: 'CVXCRV', name: 'Convex CRV' },
  { id: 'pickle-finance', symbol: 'PICKLE', name: 'Pickle Finance' },
  { id: 'alpaca-finance', symbol: 'ALPACA', name: 'Alpaca Finance' },

  // Bonus: Additional Notable Projects
  { id: 'livepeer', symbol: 'LPT', name: 'Livepeer' },
  { id: 'audius', symbol: 'AUDIO', name: 'Audius' },
  { id: 'mask-network', symbol: 'MASK', name: 'Mask Network' },
  { id: 'cartesi', symbol: 'CTSI', name: 'Cartesi' },
  { id: 'skale', symbol: 'SKL', name: 'SKALE Network' },
  { id: 'reef', symbol: 'REEF', name: 'Reef' },
  { id: 'pha', symbol: 'PHA', name: 'Phala Network' },
];

export const TIMEFRAMES = [
  { label: '1M', value: '1m' },
  { label: '5M', value: '5m' },
  { label: '1H', value: '1h' },
  { label: '1D', value: '1d' },
];
