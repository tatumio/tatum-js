import { AddressEventNotificationChain, Chain, Network } from '../dto'

export const Constant = {
  TATUM_API_URL: {
    V3: 'https://api.tatum.io/v3/',
    V4: 'https://api.tatum.io/v4/',
  },
  NETWORK: {
    ChainId: {
      [Network.ETHEREUM]: 1,
      [Network.ETHEREUM_SEPOLIA]: 11155111,
      [Network.ETHEREUM_CLASSIC]: 61,
      [Network.ETHEREUM_GOERLI]: 5,
      [Network.ETHEREUM_HOLESKY]: 17000,
      [Network.AVALANCHE_C]: 43114,
      [Network.AVALANCHE_C_TESTNET]: 43113,
      [Network.POLYGON]: 137,
      [Network.POLYGON_MUMBAI]: 80001,
      [Network.GNOSIS]: 100,
      [Network.FANTOM]: 250,
      [Network.FANTOM_TESTNET]: 4002,
      [Network.AURORA]: 1313161554,
      [Network.AURORA_TESTNET]: 1313161555,
      [Network.CELO]: 42220,
      [Network.CELO_ALFAJORES]: 44787,
      [Network.BINANCE_SMART_CHAIN_TESTNET]: 97,
      [Network.PALM]: 11297108109,
      [Network.PALM_TESTNET]: 11297108099,
      [Network.CRONOS]: 25,
      [Network.CRONOS_TESTNET]: 338,
      [Network.KUCOIN]: 321,
      [Network.KUCOIN_TESTNET]: 322,
      [Network.OASIS]: 42262,
      [Network.OASIS_TESTNET]: 42261,
      [Network.OPTIMISM]: 10,
      [Network.HARMONY_ONE_SHARD_0]: 1666600000,
      [Network.HARMONY_ONE_TESTNET_SHARD_0]: 1666700000,
      [Network.KLAYTN]: 8217,
      [Network.KLAYTN_BAOBAB]: 1001,
      [Network.FLARE_COSTON]: 16,
      [Network.FLARE_COSTON_2]: 114,
      [Network.FLARE]: 14,
      [Network.FLARE_SONGBIRD]: 19,
      [Network.HAQQ]: 11235,
      [Network.HAQQ_TESTNET]: 54211,
      [Network.ARBITRUM_NOVA]: 42170,
      [Network.ARBITRUM_NOVA_TESTNET]: 421613,
      [Network.ARBITRUM_ONE]: 42161,
      [Network.BINANCE_SMART_CHAIN]: 56,
      [Network.HORIZEN_EON]: 7332,
      [Network.HORIZEN_EON_GOBI]: 1663,
      [Network.CHILIZ]: 88888,
      [Network.GNOSIS_TESTNET]: 10200,
      [Network.VECHAIN]: 100009,
      [Network.VECHAIN_TESTNET]: 100010,
      [Network.XDC]: 50,
      [Network.XDC_TESTNET]: 51,
      [Network.OPTIMISM_TESTNET]: 420,
    },
    ChainMapInverse: {
      [AddressEventNotificationChain.ETH]: Chain.Ethereum,
      [AddressEventNotificationChain.SOL]: Chain.Solana,
      [AddressEventNotificationChain.MATIC]: Chain.Polygon,
      [AddressEventNotificationChain.CELO]: Chain.Celo,
      [AddressEventNotificationChain.KLAY]: Chain.Klaytn,
      [AddressEventNotificationChain.BTC]: Chain.Bitcoin,
      [AddressEventNotificationChain.LTC]: Chain.Litecoin,
      [AddressEventNotificationChain.BCH]: Chain.BitcoinCash,
      [AddressEventNotificationChain.DOGE]: Chain.Dogecoin,
      [AddressEventNotificationChain.TRON]: Chain.Tron,
      [AddressEventNotificationChain.BSC]: Chain.BinanceSmartChain,
    },
  },
  DECIMALS: {
    [Network.BITCOIN]: 8,
    [Network.BITCOIN_TESTNET]: 8,
    [Network.MULTIVERSX]: 18,
    [Network.MULTIVERSX_TESTNET]: 18,
    [Network.NEAR]: 24,
    [Network.NEAR_TESTNET]: 24,
    [Network.BITCOIN_CASH]: 8,
    [Network.BITCOIN_CASH_TESTNET]: 8,
    [Network.LITECOIN]: 8,
    [Network.LITECOIN_TESTNET]: 8,
    [Network.DOGECOIN]: 8,
    [Network.DOGECOIN_TESTNET]: 8,
    [Network.ZCASH]: 8,
    [Network.ZCASH_TESTNET]: 8,
    [Network.ETHEREUM]: 18,
    [Network.ETHEREUM_SEPOLIA]: 18,
    [Network.ETHEREUM_GOERLI]: 18,
    [Network.ETHEREUM_HOLESKY]: 18,
    [Network.POLYGON]: 18,
    [Network.POLYGON_MUMBAI]: 18,
    [Network.CELO]: 18,
    [Network.CELO_ALFAJORES]: 18,
    [Network.SOLANA]: 9,
    [Network.SOLANA_DEVNET]: 9,
    [Network.XRP]: 6,
    [Network.XRP_TESTNET]: 6,
    [Network.KLAYTN]: 18,
    [Network.KLAYTN_BAOBAB]: 18,
    [Network.TRON]: 6,
    [Network.TRON_SHASTA]: 6,
    [Network.BINANCE_SMART_CHAIN]: 18,
    [Network.BINANCE_SMART_CHAIN_TESTNET]: 18,
    [Network.AVALANCHE_C]: 18,
    [Network.AVALANCHE_C_TESTNET]: 18,
    [Network.AVALANCHE_P]: 18,
    [Network.AVALANCHE_P_TESTNET]: 18,
    [Network.AVALANCHE_X]: 18,
    [Network.AVALANCHE_X_TESTNET]: 18,
    [Network.FANTOM]: 18,
    [Network.FANTOM_TESTNET]: 18,
    [Network.HARMONY_ONE_SHARD_0]: 18,
    [Network.HARMONY_ONE_TESTNET_SHARD_0]: 18,
    [Network.ALGORAND]: 6,
    [Network.ALGORAND_TESTNET]: 6,
    [Network.ARBITRUM_ONE]: 18,
    [Network.ARBITRUM_NOVA_TESTNET]: 18,
    [Network.ARBITRUM_NOVA]: 18,
    [Network.AURORA]: 18,
    [Network.AURORA_TESTNET]: 18,
    [Network.CARDANO]: 6,
    [Network.CARDANO_PREPROD]: 6,
    [Network.GNOSIS]: 18,
    [Network.GNOSIS_TESTNET]: 18,
    [Network.FLOW]: 8,
    [Network.FLOW_TESTNET]: 8,
    [Network.CRONOS]: 18,
    [Network.CRONOS_TESTNET]: 18,
    [Network.KUCOIN]: 18,
    [Network.KUCOIN_TESTNET]: 18,
    [Network.ETHEREUM_CLASSIC]: 18,
    [Network.EOS]: 4,
    [Network.HORIZEN_EON]: 18,
    [Network.HORIZEN_EON_GOBI]: 18,
    [Network.EOS_TESTNET]: 4,
    [Network.TEZOS]: 6,
    [Network.TEZOS_TESTNET]: 6,
    [Network.STELLAR]: 6,
    [Network.STELLAR_TESTNET]: 6,
    [Network.OASIS]: 18,
    [Network.OASIS_TESTNET]: 18,
    [Network.OPTIMISM]: 18,
    [Network.OPTIMISM_TESTNET]: 18,
    [Network.PALM]: 18,
    [Network.PALM_TESTNET]: 18,
    [Network.POLKADOT]: 18,
    [Network.POLKADOT_TESTNET]: 18,
    [Network.RSK]: 18,
    [Network.RSK_TESTNET]: 18,
    [Network.VECHAIN]: 18,
    [Network.VECHAIN_TESTNET]: 18,
    [Network.XDC]: 18,
    [Network.XDC_TESTNET]: 18,
    [Network.ZILLIQA]: 12,
    [Network.ZILLIQA_TESTNET]: 12,
    [Network.FLARE]: 18,
    [Network.FLARE_COSTON]: 18,
    [Network.FLARE_COSTON_2]: 18,
    [Network.FLARE_SONGBIRD]: 18,
    [Network.HAQQ]: 18,
    [Network.HAQQ_TESTNET]: 18,
    [Network.CHILIZ]: 18,
  },
  CURRENCY_NAMES: {
    [Network.BITCOIN]: 'BTC',
    [Network.BITCOIN_TESTNET]: 'BTC',
    [Network.NEAR]: 'NEAR',
    [Network.NEAR_TESTNET]: 'NEAR',
    [Network.MULTIVERSX]: 'EGLD',
    [Network.MULTIVERSX_TESTNET]: 'EGLD',
    [Network.BITCOIN_CASH]: 'BCH',
    [Network.BITCOIN_CASH_TESTNET]: 'BCH',
    [Network.LITECOIN]: 'LTC',
    [Network.LITECOIN_TESTNET]: 'LTC',
    [Network.DOGECOIN]: 'DOGE',
    [Network.DOGECOIN_TESTNET]: 'DOGE',
    [Network.ZCASH]: 'ZEC',
    [Network.ZCASH_TESTNET]: 'ZEC',
    [Network.ETHEREUM]: 'ETH',
    [Network.ETHEREUM_SEPOLIA]: 'ETH',
    [Network.ETHEREUM_HOLESKY]: 'ETH',
    [Network.ETHEREUM_GOERLI]: 'ETH',
    [Network.POLYGON]: 'MATIC',
    [Network.POLYGON_MUMBAI]: 'MATIC',
    [Network.CELO]: 'CELO',
    [Network.CELO_ALFAJORES]: 'CELO',
    [Network.SOLANA]: 'SOL',
    [Network.SOLANA_DEVNET]: 'SOL',
    [Network.XRP]: 'XRP',
    [Network.XRP_TESTNET]: 'XRP',
    [Network.KLAYTN]: 'KLAY',
    [Network.KLAYTN_BAOBAB]: 'KLAY',
    [Network.TRON]: 'TRX',
    [Network.TRON_SHASTA]: 'TRX',
    [Network.BINANCE_SMART_CHAIN]: 'BNB',
    [Network.BINANCE_SMART_CHAIN_TESTNET]: 'BNB',
    [Network.AVALANCHE_C]: 'AVAX',
    [Network.AVALANCHE_C_TESTNET]: 'AVAX',
    [Network.AVALANCHE_P]: 'AVAX',
    [Network.AVALANCHE_P_TESTNET]: 'AVAX',
    [Network.AVALANCHE_X]: 'AVAX',
    [Network.AVALANCHE_X_TESTNET]: 'AVAX',
    [Network.FANTOM]: 'FTM',
    [Network.FANTOM_TESTNET]: 'FTM',
    [Network.HARMONY_ONE_SHARD_0]: 'ONE',
    [Network.HARMONY_ONE_TESTNET_SHARD_0]: 'ONE',
    [Network.ALGORAND]: 'ALGO',
    [Network.ALGORAND_TESTNET]: 'ALGO',
    [Network.ARBITRUM_ONE]: 'ARB',
    [Network.ARBITRUM_NOVA_TESTNET]: 'ARB',
    [Network.ARBITRUM_NOVA]: 'ARB',
    [Network.AURORA]: 'AURA',
    [Network.AURORA_TESTNET]: 'AURA',
    [Network.CARDANO]: 'ADA',
    [Network.CARDANO_PREPROD]: 'ADA',
    [Network.GNOSIS]: 'GNO',
    [Network.GNOSIS_TESTNET]: 'GNO',
    [Network.FLOW]: 'FLOW',
    [Network.FLARE]: 'FLARE',
    [Network.FLARE_COSTON]: 'FLARE',
    [Network.FLARE_COSTON_2]: 'FLARE',
    [Network.FLARE_SONGBIRD]: 'FLARE',
    [Network.FLOW_TESTNET]: 'FLOW',
    [Network.CRONOS]: 'CRO',
    [Network.CRONOS_TESTNET]: 'CRO',
    [Network.KUCOIN]: 'KCS',
    [Network.KUCOIN_TESTNET]: 'KCS',
    [Network.ETHEREUM_CLASSIC]: 'ETC',
    [Network.EOS]: 'EOS',
    [Network.HORIZEN_EON]: 'EON',
    [Network.HORIZEN_EON_GOBI]: 'EON',
    [Network.EOS_TESTNET]: 'EOS',
    [Network.TEZOS]: 'XTZ',
    [Network.TEZOS_TESTNET]: 'XTZ',
    [Network.STELLAR]: 'XLM',
    [Network.STELLAR_TESTNET]: 'XLM',
    [Network.OASIS]: 'ROSE',
    [Network.OASIS_TESTNET]: 'ROSE',
    [Network.OPTIMISM]: 'OPT',
    [Network.OPTIMISM_TESTNET]: 'OPT',
    [Network.PALM]: 'PALM',
    [Network.PALM_TESTNET]: 'PALM',
    [Network.POLKADOT]: 'DOT',
    [Network.POLKADOT_TESTNET]: 'DOT',
    [Network.RSK]: 'RBTC',
    [Network.RSK_TESTNET]: 'RBTC',
    [Network.VECHAIN]: 'VET',
    [Network.VECHAIN_TESTNET]: 'VET',
    [Network.XDC]: 'XDC',
    [Network.XDC_TESTNET]: 'XDC',
    [Network.ZILLIQA]: 'ZIL',
    [Network.ZILLIQA_TESTNET]: 'ZIL',
    [Network.HAQQ]: 'HAQQ',
    [Network.HAQQ_TESTNET]: 'HAQQ',
    [Network.CHILIZ]: 'CHILIZ',
  },
  RPC: {
    MAINNETS: [
      Network.ALGORAND,
      Network.ARBITRUM_NOVA,
      Network.ARBITRUM_ONE,
      Network.AURORA,
      Network.AVALANCHE_C,
      Network.AVALANCHE_P,
      Network.AVALANCHE_X,
      Network.BINANCE_SMART_CHAIN,
      Network.BITCOIN,
      Network.BITCOIN_CASH,
      Network.CARDANO,
      Network.CELO,
      Network.CRONOS,
      Network.DOGECOIN,
      Network.EOS,
      Network.ETHEREUM,
      Network.ETHEREUM_CLASSIC,
      Network.FANTOM,
      Network.FLOW,
      Network.GNOSIS,
      Network.HARMONY_ONE_SHARD_0,
      Network.KLAYTN,
      Network.KUCOIN,
      Network.LITECOIN,
      Network.MULTIVERSX,
      Network.NEAR,
      Network.OASIS,
      Network.OPTIMISM,
      Network.PALM,
      Network.POLYGON,
      Network.POLKADOT,
      Network.RSK,
      Network.SOLANA,
      Network.STELLAR,
      Network.TEZOS,
      Network.TRON,
      Network.VECHAIN,
      Network.XDC,
      Network.XRP,
      Network.ZCASH,
      Network.ZILLIQA,
      Network.CHILIZ,
    ],
    TESTNETS: [
      Network.ALGORAND_TESTNET,
      Network.ARBITRUM_NOVA_TESTNET,
      Network.AURORA_TESTNET,
      Network.AVALANCHE_C_TESTNET,
      Network.AVALANCHE_P_TESTNET,
      Network.AVALANCHE_X_TESTNET,
      Network.BINANCE_SMART_CHAIN_TESTNET,
      Network.BITCOIN_TESTNET,
      Network.BITCOIN_CASH_TESTNET,
      Network.CARDANO_PREPROD,
      Network.CELO_ALFAJORES,
      Network.CRONOS_TESTNET,
      Network.DOGECOIN_TESTNET,
      Network.ETHEREUM_GOERLI,
      Network.ETHEREUM_SEPOLIA,
      Network.ETHEREUM_HOLESKY,
      Network.EOS_TESTNET,
      Network.FANTOM_TESTNET,
      Network.FLOW_TESTNET,
      Network.GNOSIS_TESTNET,
      Network.HARMONY_ONE_TESTNET_SHARD_0,
      Network.KLAYTN_BAOBAB,
      Network.KUCOIN_TESTNET,
      Network.LITECOIN_TESTNET,
      Network.MULTIVERSX_TESTNET,
      Network.NEAR_TESTNET,
      Network.OASIS_TESTNET,
      Network.OPTIMISM_TESTNET,
      Network.PALM_TESTNET,
      Network.POLYGON_MUMBAI,
      Network.POLKADOT_TESTNET,
      Network.RSK_TESTNET,
      Network.SOLANA_DEVNET,
      Network.STELLAR_TESTNET,
      Network.TEZOS_TESTNET,
      Network.TRON_SHASTA,
      Network.VECHAIN_TESTNET,
      Network.XDC_TESTNET,
      Network.XRP_TESTNET,
      Network.ZCASH_TESTNET,
      Network.ZILLIQA_TESTNET,
      Network.HORIZEN_EON_GOBI,
    ],
    METHOD_PREFIX: 'eth_',
  },
  OPEN_RPC: {
    LB_INTERVAL: 60_000,
    ALLOWED_BLOCKS_BEHIND: 10,
  },
  TRON_SHASTA_BASE_URL: {
    BASE: 'https://api.shasta.trongrid.io',
    RPC: 'https://api.shasta.trongrid.io/jsonrpc',
  },
  EOS_PREFIX: 'v1/chain/',
}
