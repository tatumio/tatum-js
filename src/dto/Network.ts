import { Currency } from './Currency'

export enum Network {
  // Mainnets
  ALGORAND_ALGOD = 'algorand-mainnet-algod',
  ALGORAND_INDEXER = 'algorand-mainnet-indexer',
  ARBITRUM_NOVA = 'arb-nova-mainnet',
  ARBITRUM_ONE = 'arbitrum-one-mainnet',
  AURORA = 'aurora-mainnet',
  AVALANCHE_C = 'avalanche-c-mainnet',
  AVALANCHE_P = 'avax-p-mainnet',
  AVALANCHE_X = 'avax-x-mainnet',
  BINANCE_SMART_CHAIN = 'bsc-mainnet',
  BNB = 'bnb-beacon-chain-mainnet',
  BITCOIN = 'bitcoin-mainnet',
  BITCOIN_CASH = 'bitcoin-cash-mainnet',
  CARDANO_ROSETTA = 'cardano-mainnet',
  CELO = 'celo-mainnet',
  CRONOS = 'cronos-mainnet',
  DOGECOIN = 'doge-mainnet',
  EOS = 'eos-mainnet',
  HORIZEN_EON = 'eon-mainnet',
  CHILIZ = 'chiliz-mainnet',
  ETHEREUM = 'ethereum-mainnet',
  ETHEREUM_CLASSIC = 'ethereum-classic-mainnet',
  FANTOM = 'fantom-mainnet',
  FLARE = 'flare-mainnet',
  FLOW = 'flow-mainnet',
  GNOSIS = 'gno-mainnet',
  HAQQ = 'haqq-mainnet',
  HARMONY_ONE_SHARD_0 = 'one-mainnet-s0',
  KLAYTN = 'klaytn-mainnet',
  KUCOIN = 'kcs-mainnet',
  LITECOIN = 'litecoin-mainnet',
  MULTIVERSX = 'egld-mainnet',
  NEAR = 'near-mainnet',
  OASIS = 'oasis-mainnet',
  OPTIMISM = 'optimism-mainnet',
  PALM = 'palm-mainnet',
  POLYGON = 'polygon-mainnet',
  POLKADOT = 'dot-mainnet',
  RSK = 'rsk-mainnet',
  SOLANA = 'solana-mainnet',
  STELLAR = 'stellar-mainnet',
  TEZOS = 'tezos-mainnet',
  TRON = 'tron-mainnet',
  VECHAIN = 'vechain-mainnet',
  XINFIN = 'xinfin-mainnet',
  XRP = 'ripple-mainnet',
  ZCASH = 'zcash-mainnet',
  ZILLIQA = 'zilliqa-mainnet',

  // Testnets
  ALGORAND_ALGOD_TESTNET = 'algorand-testnet-algod',
  ALGORAND_INDEXER_TESTNET = 'algorand-testnet-indexer',
  ARBITRUM_NOVA_TESTNET = 'arb-testnet',
  AURORA_TESTNET = 'aurora-testnet',
  AVALANCHE_C_TESTNET = 'avax-testnet',
  AVALANCHE_P_TESTNET = 'avax-p-testnet',
  AVALANCHE_X_TESTNET = 'avax-x-testnet',
  BINANCE_SMART_CHAIN_TESTNET = 'bsc-testnet',
  BITCOIN_TESTNET = 'bitcoin-testnet',
  BITCOIN_CASH_TESTNET = 'bch-testnet',
  CARDANO_ROSETTA_PREPROD = 'cardano-preprod',
  CELO_ALFAJORES = 'celo-testnet',
  CRONOS_TESTNET = 'cro-testnet',
  DOGECOIN_TESTNET = 'doge-testnet',
  ETHEREUM_SEPOLIA = 'ethereum-sepolia',
  ETHEREUM_HOLESKY = 'ethereum-holesky',
  EOS_TESTNET = 'eos-testnet',
  FANTOM_TESTNET = 'fantom-testnet',
  FLARE_COSTON = 'flare-coston',
  FLARE_COSTON_2 = 'flare-coston2',
  FLARE_SONGBIRD = 'flare-songbird',
  FLOW_TESTNET = 'flow-testnet',
  GNOSIS_TESTNET = 'gno-testnet',
  HAQQ_TESTNET = 'haqq-testnet',
  HARMONY_ONE_TESTNET_SHARD_0 = 'one-testnet-s0',
  HORIZEN_EON_GOBI = 'horizen-eon-gobi',
  KLAYTN_BAOBAB = 'klaytn-baobab',
  KUCOIN_TESTNET = 'kcs-testnet',
  LITECOIN_TESTNET = 'litecoin-testnet',
  MULTIVERSX_TESTNET = 'egld-testnet',
  NEAR_TESTNET = 'near-testnet',
  OASIS_TESTNET = 'oasis-testnet',
  OPTIMISM_TESTNET = 'optimism-testnet',
  PALM_TESTNET = 'palm-testnet',
  POLYGON_MUMBAI = 'polygon-mumbai',
  POLKADOT_TESTNET = 'dot-testnet',
  RSK_TESTNET = 'rsk-testnet',
  SOLANA_DEVNET = 'solana-devnet',
  STELLAR_TESTNET = 'stellar-testnet',
  TEZOS_TESTNET = 'tezos-testnet',
  TRON_SHASTA = 'tron-testnet',
  VECHAIN_TESTNET = 'vechain-testnet',
  XINFIN_TESTNET = 'xdc-testnet',
  XRP_TESTNET = 'ripple-testnet',
  ZCASH_TESTNET = 'zcash-testnet',
  ZILLIQA_TESTNET = 'zilliqa-testnet',
}

export const EVM_BASED_NETWORKS = [
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.ETHEREUM_CLASSIC,
  Network.ETHEREUM_HOLESKY,
  Network.AVALANCHE_C,
  Network.AVALANCHE_C_TESTNET,
  Network.POLYGON,
  Network.POLYGON_MUMBAI,
  Network.GNOSIS,
  Network.GNOSIS_TESTNET,
  Network.FANTOM,
  Network.FANTOM_TESTNET,
  Network.AURORA,
  Network.AURORA_TESTNET,
  Network.CELO,
  Network.CELO_ALFAJORES,
  Network.BINANCE_SMART_CHAIN_TESTNET,
  Network.VECHAIN,
  Network.VECHAIN_TESTNET,
  Network.XINFIN,
  Network.XINFIN_TESTNET,
  Network.PALM,
  Network.PALM_TESTNET,
  Network.CRONOS,
  Network.CRONOS_TESTNET,
  Network.KUCOIN,
  Network.KUCOIN_TESTNET,
  Network.OASIS,
  Network.OASIS_TESTNET,
  Network.OPTIMISM,
  Network.OPTIMISM_TESTNET,
  Network.HARMONY_ONE_SHARD_0,
  Network.HARMONY_ONE_TESTNET_SHARD_0,
  Network.KLAYTN,
  Network.KLAYTN_BAOBAB,
  Network.FLARE_COSTON,
  Network.FLARE_COSTON_2,
  Network.FLARE,
  Network.FLARE_SONGBIRD,
  Network.HAQQ,
  Network.HAQQ_TESTNET,
  Network.ARBITRUM_NOVA,
  Network.ARBITRUM_NOVA_TESTNET,
  Network.ARBITRUM_ONE,
  Network.BINANCE_SMART_CHAIN,
  Network.HORIZEN_EON,
  Network.HORIZEN_EON_GOBI,
  Network.CHILIZ,
]

export const UTXO_BASED_NETWORKS = [
  Network.BITCOIN,
  Network.BITCOIN_TESTNET,
  Network.BITCOIN_CASH,
  Network.BITCOIN_CASH_TESTNET,
  Network.LITECOIN,
  Network.LITECOIN_TESTNET,
  Network.ZCASH,
  Network.ZCASH_TESTNET,
]

export const UTXO_LOAD_BALANCER_ESTIMATE_FEE_NETWORKS = [Network.BITCOIN_CASH]

export const UTXO_ESTIMATE_FEE_NETWORKS = [Network.BITCOIN_CASH_TESTNET]

export const DATA_API_UTXO_NETWORKS = [
  Network.BITCOIN,
  Network.BITCOIN_TESTNET,
  Network.LITECOIN,
  Network.LITECOIN_TESTNET,
  Network.CARDANO_ROSETTA,
  Network.CARDANO_ROSETTA_PREPROD,
  Network.DOGECOIN,
  Network.DOGECOIN_TESTNET,
]

export const DATA_API_EVM_NETWORKS = [
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.POLYGON,
  Network.POLYGON_MUMBAI,
  Network.BINANCE_SMART_CHAIN,
  Network.BINANCE_SMART_CHAIN_TESTNET,
  Network.CELO,
  Network.CELO_ALFAJORES,
  Network.HORIZEN_EON,
]

export const DATA_API_NETWORKS = [...DATA_API_EVM_NETWORKS, Network.TEZOS]

export const UTXO_LOAD_BALANCER_NETWORKS = [
  Network.BITCOIN,
  Network.BITCOIN_TESTNET,
  Network.LITECOIN,
  Network.LITECOIN_TESTNET,
  Network.ZCASH,
  Network.BITCOIN_CASH,
]

export const DOGECOIN_LOAD_BALANCED_NETWORKS = [Network.DOGECOIN, Network.DOGECOIN_TESTNET]

export const EVM_LOAD_BALANCER_NETWORKS = [
  Network.FLARE,
  Network.FLARE_COSTON,
  Network.FLARE_COSTON_2,
  Network.FLARE_SONGBIRD,
  Network.HAQQ,
  Network.HAQQ_TESTNET,
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.ETHEREUM_HOLESKY,
  Network.POLYGON,
  Network.POLYGON_MUMBAI,
  Network.OPTIMISM,
  Network.OPTIMISM_TESTNET,
  Network.HORIZEN_EON,
  Network.HORIZEN_EON_GOBI,
  Network.ARBITRUM_ONE,
  Network.BINANCE_SMART_CHAIN,
  Network.CHILIZ,
  Network.ETHEREUM_CLASSIC,
  Network.AVALANCHE_C,
  Network.CELO,
  Network.CELO_ALFAJORES,
  Network.XINFIN,
  Network.FANTOM,
  Network.CRONOS,
]

export const TRON_LOAD_BALANCER_NETWORKS = [Network.TRON]
export const EOS_LOAD_BALANCER_NETWORKS = [Network.EOS]
export const XRP_LOAD_BALANCER_NETWORKS = [Network.XRP, Network.XRP_TESTNET]
export const NATIVE_EVM_LOAD_BALANCER_NETWORKS = [Network.KLAYTN, Network.KLAYTN_BAOBAB]
export const SOLANA_NETWORKS = [Network.SOLANA, Network.SOLANA_DEVNET]
export const BNB_LOAD_BALANCER_NETWORKS = [Network.BNB]
export const TEZOS_NETWORKS = [Network.TEZOS, Network.TEZOS_TESTNET]
export const ALGORAND_ALGOD_NETWORKS = [Network.ALGORAND_ALGOD, Network.ALGORAND_ALGOD_TESTNET]
export const ALGORAND_INDEXER_NETWORKS = [Network.ALGORAND_INDEXER, Network.ALGORAND_INDEXER_TESTNET]
export const CARDANO_NETWORKS = [Network.CARDANO_ROSETTA, Network.CARDANO_ROSETTA_PREPROD]
export const STELLAR_LOAD_BALANCER_NETWORKS = [Network.STELLAR]

export const LOAD_BALANCER_NETWORKS = [
  ...UTXO_LOAD_BALANCER_NETWORKS,
  ...DOGECOIN_LOAD_BALANCED_NETWORKS,
  ...EVM_LOAD_BALANCER_NETWORKS,
  ...TRON_LOAD_BALANCER_NETWORKS,
  ...EOS_LOAD_BALANCER_NETWORKS,
  ...XRP_LOAD_BALANCER_NETWORKS,
  ...NATIVE_EVM_LOAD_BALANCER_NETWORKS,
  ...SOLANA_NETWORKS,
  ...BNB_LOAD_BALANCER_NETWORKS,
  ...TEZOS_NETWORKS,
  ...ALGORAND_ALGOD_NETWORKS,
  ...ALGORAND_INDEXER_NETWORKS,
  ...CARDANO_NETWORKS,
  ...STELLAR_LOAD_BALANCER_NETWORKS,
]

export const EVM_ARCHIVE_NON_ARCHIVE_LOAD_BALANCER_NETWORKS = [
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.HAQQ,
  Network.HAQQ_TESTNET,
  Network.POLYGON,
  Network.POLYGON_MUMBAI,
  Network.CHILIZ,
]

export const EVM_ARCHIVE_NON_ARCHIVE_BEACON_LOAD_BALANCER_NETWORKS = [
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.ETHEREUM_HOLESKY,
]

export const TRON_NETWORKS = [Network.TRON, Network.TRON_SHASTA]
export const EOS_NETWORKS = [Network.EOS, Network.EOS_TESTNET]

export const isEvmBasedNetwork = (network: Network) => EVM_BASED_NETWORKS.includes(network)

export const isUtxoBasedNetwork = (network: Network) => UTXO_BASED_NETWORKS.includes(network)

export const isUtxoLoadBalancerEstimateFeeNetwork = (network: Network) =>
  UTXO_LOAD_BALANCER_ESTIMATE_FEE_NETWORKS.includes(network)

export const isDogecoinLoadBalancedNetwork = (network: Network) =>
  DOGECOIN_LOAD_BALANCED_NETWORKS.includes(network)

export const isUtxoEstimateFeeNetwork = (network: Network) => UTXO_ESTIMATE_FEE_NETWORKS.includes(network)

export const isUtxoLoadBalancerNetwork = (network: Network) => UTXO_LOAD_BALANCER_NETWORKS.includes(network)

export const isXrpNetwork = (network: Network) => [Network.XRP, Network.XRP_TESTNET].includes(network)

export const isDataApiEvmEnabledNetwork = (network: Network) => DATA_API_EVM_NETWORKS.includes(network)

export const isDataApiEnabledNetwork = (network: Network) => DATA_API_NETWORKS.includes(network)

export const isDataApiUtxoEnabledNetwork = (network: Network) => DATA_API_UTXO_NETWORKS.includes(network)

export const isSolanaNetwork = (network: Network) => SOLANA_NETWORKS.includes(network)

export const isTronNetwork = (network: Network) => TRON_NETWORKS.includes(network)

export const isEosNetwork = (network: Network) => EOS_NETWORKS.includes(network)

export const isLoadBalancerNetwork = (network: Network) => LOAD_BALANCER_NETWORKS.includes(network)

export const isEvmLoadBalancerNetwork = (network: Network) => EVM_LOAD_BALANCER_NETWORKS.includes(network)

export const isEvmArchiveNonArchiveLoadBalancerNetwork = (network: Network) =>
  EVM_ARCHIVE_NON_ARCHIVE_LOAD_BALANCER_NETWORKS.includes(network)

export const isEvmArchiveNonArchiveBeaconLoadBalancerNetwork = (network: Network) =>
  EVM_ARCHIVE_NON_ARCHIVE_BEACON_LOAD_BALANCER_NETWORKS.includes(network)

export const isTronLoadBalancerNetwork = (network: Network) => TRON_LOAD_BALANCER_NETWORKS.includes(network)

export const isEosLoadBalancerNetwork = (network: Network) => EOS_LOAD_BALANCER_NETWORKS.includes(network)

export const isXrpLoadBalancerNetwork = (network: Network) => XRP_LOAD_BALANCER_NETWORKS.includes(network)

export const isNativeEvmLoadBalancerNetwork = (network: Network) =>
  NATIVE_EVM_LOAD_BALANCER_NETWORKS.includes(network)

export const isBnbLoadBalancerNetwork = (network: Network) => BNB_LOAD_BALANCER_NETWORKS.includes(network)

export const isTezosNetwork = (network: Network) => TEZOS_NETWORKS.includes(network)

export const isAlgorandAlgodNetwork = (network: Network) => ALGORAND_ALGOD_NETWORKS.includes(network)

export const isAlgorandIndexerNetwork = (network: Network) => ALGORAND_INDEXER_NETWORKS.includes(network)

export const isCardanoNetwork = (network: Network) => CARDANO_NETWORKS.includes(network)

export const isStellarLoadBalancerNetwork = (network: Network) =>
  STELLAR_LOAD_BALANCER_NETWORKS.includes(network)

export const isStellarNetwork = (network: Network) =>
  [Network.STELLAR, Network.STELLAR_TESTNET].includes(network)

export const isSameGetBlockNetwork = (network: Network) =>
  isUtxoBasedNetwork(network) ||
  isEvmBasedNetwork(network) ||
  isTronNetwork(network) ||
  isSolanaNetwork(network)

export enum MappedNetwork {
  HORIZEN_EON = 'horizen-eon-mainnet',
  DOGECOIN = 'dogecoin-mainnet',
  DOGECOIN_TESTNET = 'dogecoin-testnet',
}

export const MAPPED_NETWORK = {
  [Network.HORIZEN_EON]: MappedNetwork.HORIZEN_EON,
  [Network.DOGECOIN]: MappedNetwork.DOGECOIN,
  [Network.DOGECOIN_TESTNET]: MappedNetwork.DOGECOIN_TESTNET,
}

export const NATIVE_PREFIX_MAPPING: { [key: string]: string } = {
  [Network.KLAYTN]: 'klay_',
  [Network.KLAYTN_BAOBAB]: 'klay_',
}

/**
 * Describes additional info about every chain in a system.
 * @param testnet - If true - chain is testnet.
 * @param currency - Currency of the chain.
 * @param alternativeCurrencies - Alternative currencies of the chain, for case we have few currencies meaning the same chain.
 * @param defaultTestnet - If true - this chain is default testnet among others for this currency.
 * @param defaultMainnet - If true - this chain is default mainnet among others for this currency.
 * @param chainId - Network id.
 */
export type NetworkMetadata = {
  testnet: boolean
  currency: Currency
  alternativeCurrencies?: Currency[]
  defaultTestnet?: boolean
  defaultMainnet?: boolean
  chainId?: number
}

export const NETWORK_METADATA: Record<Network, NetworkMetadata> = {
  [Network.ETHEREUM_SEPOLIA]: {
    currency: Currency.ETH,
    testnet: true,
    defaultTestnet: true,
    chainId: 11155111,
  },
  [Network.ETHEREUM_HOLESKY]: {
    currency: Currency.ETH,
    testnet: true,
    chainId: 17000,
  },
  [Network.ETHEREUM]: {
    currency: Currency.ETH,
    testnet: false,
    defaultMainnet: true,
    chainId: 1,
  },
  [Network.POLYGON_MUMBAI]: {
    currency: Currency.MATIC,
    testnet: true,
    defaultTestnet: true,
    chainId: 80001,
  },
  [Network.POLYGON]: {
    currency: Currency.MATIC,
    testnet: false,
    defaultMainnet: true,
    chainId: 137,
  },
  [Network.KLAYTN_BAOBAB]: {
    currency: Currency.KLAY,
    testnet: true,
    defaultTestnet: true,
    chainId: 1001,
  },
  [Network.KLAYTN]: {
    currency: Currency.KLAY,
    testnet: false,
    defaultMainnet: true,
    chainId: 8217,
  },
  [Network.SOLANA_DEVNET]: {
    currency: Currency.SOL,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.SOLANA]: {
    currency: Currency.SOL,
    testnet: false,
    defaultMainnet: true,
  },
  [Network.CELO]: {
    currency: Currency.CELO,
    testnet: false,
    chainId: 42220,
  },
  [Network.CELO_ALFAJORES]: {
    currency: Currency.CELO,
    testnet: true,
    defaultTestnet: true,
    chainId: 44787,
  },
  [Network.ALGORAND_ALGOD_TESTNET]: {
    currency: Currency.ALGO,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.ALGORAND_ALGOD]: {
    currency: Currency.ALGO,
    testnet: false,
    defaultMainnet: true,
  },
  [Network.ALGORAND_INDEXER_TESTNET]: {
    currency: Currency.ALGO,
    testnet: true,
  },
  [Network.ALGORAND_INDEXER]: {
    currency: Currency.ALGO,
    testnet: false,
  },
  [Network.BITCOIN]: {
    currency: Currency.BTC,
    testnet: false,
  },
  [Network.BITCOIN_TESTNET]: {
    currency: Currency.BTC,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.LITECOIN]: {
    currency: Currency.LTC,
    testnet: false,
  },
  [Network.LITECOIN_TESTNET]: {
    currency: Currency.LTC,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.CARDANO_ROSETTA]: {
    currency: Currency.ADA,
    testnet: false,
    defaultMainnet: true,
  },
  [Network.CARDANO_ROSETTA_PREPROD]: {
    currency: Currency.ADA,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.VECHAIN_TESTNET]: {
    currency: Currency.VET,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.VECHAIN]: {
    currency: Currency.VET,
    testnet: false,
  },
  [Network.XRP]: {
    currency: Currency.XRP,
    testnet: false,
  },
  [Network.XRP_TESTNET]: {
    currency: Currency.XRP,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.FLOW]: {
    currency: Currency.FLOW,
    testnet: false,
  },
  [Network.FLOW_TESTNET]: {
    currency: Currency.FLOW,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.XINFIN]: {
    currency: Currency.XDC,
    testnet: false,
    chainId: 50,
  },
  [Network.XINFIN_TESTNET]: {
    currency: Currency.XDC,
    testnet: true,
    defaultTestnet: true,
    chainId: 51,
  },
  [Network.TRON]: {
    currency: Currency.TRON,
    testnet: false,
    chainId: 728126428,
  },
  [Network.TRON_SHASTA]: {
    currency: Currency.TRON,
    testnet: true,
    defaultTestnet: true,
    chainId: 2494104990,
  },
  [Network.BINANCE_SMART_CHAIN]: {
    currency: Currency.BSC,
    testnet: false,
    defaultMainnet: true,
    chainId: 56,
  },
  [Network.BINANCE_SMART_CHAIN_TESTNET]: {
    currency: Currency.BSC,
    testnet: true,
    defaultTestnet: true,
    chainId: 97,
  },
  [Network.BITCOIN_CASH]: {
    currency: Currency.BCH,
    testnet: false,
  },
  [Network.BITCOIN_CASH_TESTNET]: {
    currency: Currency.BCH,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.STELLAR]: {
    currency: Currency.XLM,
    testnet: false,
  },
  [Network.STELLAR_TESTNET]: {
    currency: Currency.XLM,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.BNB]: {
    currency: Currency.BNB,
    testnet: false,
    defaultMainnet: true,
  },
  [Network.DOGECOIN]: {
    currency: Currency.DOGE,
    testnet: false,
  },
  [Network.DOGECOIN_TESTNET]: {
    currency: Currency.DOGE,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.HARMONY_ONE_SHARD_0]: {
    currency: Currency.ONE,
    testnet: false,
    chainId: 1666600000,
  },
  [Network.HARMONY_ONE_TESTNET_SHARD_0]: {
    currency: Currency.ONE,
    testnet: true,
    defaultTestnet: true,
    chainId: 1666700000,
  },
  [Network.EOS]: {
    currency: Currency.EOS,
    testnet: false,
    defaultMainnet: true,
  },
  [Network.EOS_TESTNET]: {
    currency: Currency.EOS,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.AVALANCHE_C]: {
    currency: Currency.AVAX,
    testnet: false,
    defaultMainnet: true,
    chainId: 43114,
  },
  [Network.AVALANCHE_C_TESTNET]: {
    currency: Currency.AVAX,
    testnet: true,
    defaultTestnet: true,
    chainId: 43113,
  },
  [Network.AVALANCHE_X]: {
    currency: Currency.AVAX,
    testnet: false,
  },
  [Network.AVALANCHE_X_TESTNET]: {
    currency: Currency.AVAX,
    testnet: true,
  },
  [Network.AVALANCHE_P]: {
    currency: Currency.AVAX,
    testnet: false,
  },
  [Network.AVALANCHE_P_TESTNET]: {
    currency: Currency.AVAX,
    testnet: true,
  },
  [Network.FANTOM]: {
    currency: Currency.FTM,
    testnet: false,
    chainId: 250,
  },
  [Network.FANTOM_TESTNET]: {
    currency: Currency.FTM,
    testnet: true,
    defaultTestnet: true,
    chainId: 4002,
  },
  [Network.ARBITRUM_NOVA]: {
    currency: Currency.ARB,
    testnet: false,
    defaultMainnet: true,
    chainId: 42170,
  },
  [Network.ARBITRUM_NOVA_TESTNET]: {
    currency: Currency.ARB,
    testnet: true,
    defaultTestnet: true,
    chainId: 421613,
  },
  [Network.ARBITRUM_ONE]: {
    currency: Currency.ARB,
    testnet: false,
    chainId: 42161,
  },
  [Network.OPTIMISM]: {
    currency: Currency.OP,
    testnet: false,
    defaultMainnet: true,
    chainId: 10,
  },
  [Network.OPTIMISM_TESTNET]: {
    currency: Currency.OP,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.NEAR]: {
    currency: Currency.NEAR,
    testnet: false,
  },
  [Network.NEAR_TESTNET]: {
    currency: Currency.NEAR,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.RSK]: {
    currency: Currency.RSK,
    testnet: false,
  },
  [Network.RSK_TESTNET]: {
    currency: Currency.RSK,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.AURORA]: {
    currency: Currency.AURORA,
    testnet: false,
    chainId: 1313161554,
  },
  [Network.AURORA_TESTNET]: {
    currency: Currency.AURORA,
    testnet: true,
    defaultTestnet: true,
    chainId: 1313161555,
  },
  [Network.OASIS]: {
    currency: Currency.XOS,
    testnet: false,
    chainId: 42262,
  },
  [Network.OASIS_TESTNET]: {
    currency: Currency.XOS,
    testnet: true,
    defaultTestnet: true,
    chainId: 42261,
  },
  [Network.TEZOS]: {
    currency: Currency.TEZOS,
    testnet: false,
    defaultMainnet: true,
  },
  [Network.TEZOS_TESTNET]: {
    currency: Currency.TEZOS,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.ZCASH]: {
    currency: Currency.ZCASH,
    alternativeCurrencies: [Currency.ZEC],
    testnet: false,
  },
  [Network.ZCASH_TESTNET]: {
    currency: Currency.ZCASH,
    alternativeCurrencies: [Currency.ZEC],
    testnet: true,
    defaultTestnet: true,
  },
  [Network.PALM]: {
    currency: Currency.PALM,
    testnet: false,
  },
  [Network.PALM_TESTNET]: {
    currency: Currency.PALM,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.ZILLIQA]: {
    currency: Currency.ZIL,
    testnet: false,
  },
  [Network.ZILLIQA_TESTNET]: {
    currency: Currency.ZIL,
    testnet: true,
    defaultTestnet: true,
  },
  [Network.ETHEREUM_CLASSIC]: {
    currency: Currency.ETC,
    testnet: false,
    defaultMainnet: true,
    chainId: 61,
  },
  [Network.FLARE]: {
    currency: Currency.FLR,
    testnet: false,
    chainId: 14,
    defaultMainnet: true,
  },
  [Network.FLARE_COSTON_2]: {
    currency: Currency.FLR,
    testnet: true,
    chainId: 114,
  },
  [Network.FLARE_SONGBIRD]: {
    currency: Currency.SGB,
    testnet: true,
    chainId: 19,
  },
  [Network.FLARE_COSTON]: {
    currency: Currency.SGB,
    testnet: true,
    defaultTestnet: true,
    chainId: 16,
  },
  [Network.HAQQ]: {
    currency: Currency.ISLM,
    testnet: false,
    chainId: 11235,
  },
  [Network.HAQQ_TESTNET]: {
    currency: Currency.ISLM,
    testnet: true,
    defaultTestnet: true,
    chainId: 54211,
  },
  [Network.HORIZEN_EON]: {
    currency: Currency.ZEN,
    testnet: false,
    chainId: 7332,
  },
  [Network.HORIZEN_EON_GOBI]: {
    currency: Currency.ZEN,
    testnet: true,
    defaultTestnet: true,
    chainId: 1663,
  },
  [Network.CHILIZ]: {
    currency: Currency.CHZ,
    testnet: false,
    chainId: 88888,
  },
  [Network.GNOSIS]: {
    currency: Currency.GNO,
    testnet: false,
    chainId: 100,
  },
  [Network.GNOSIS_TESTNET]: {
    currency: Currency.GNO,
    testnet: true,
    chainId: 69,
  },
  [Network.CRONOS]: {
    currency: Currency.CRO,
    testnet: false,
    chainId: 25,
  },
  [Network.CRONOS_TESTNET]: {
    currency: Currency.CRO,
    testnet: true,
    chainId: 338,
  },
  [Network.KUCOIN]: {
    currency: Currency.KCS,
    testnet: false,
    chainId: 321,
  },
  [Network.KUCOIN_TESTNET]: {
    currency: Currency.KCS,
    testnet: true,
    chainId: 322,
  },
  [Network.MULTIVERSX]: {
    currency: Currency.EGLD,
    testnet: false,
    chainId: 1,
  },
  [Network.MULTIVERSX_TESTNET]: {
    currency: Currency.EGLD,
    testnet: true,
    chainId: 2,
  },
  [Network.POLKADOT]: {
    currency: Currency.DOT,
    testnet: false,
    chainId: 0,
  },
  [Network.POLKADOT_TESTNET]: {
    currency: Currency.DOT,
    testnet: true,
    chainId: 0,
  },
}
