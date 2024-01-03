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
  CRONOS = 'cro-mainnet',
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
  ETHEREUM_GOERLI = 'ethereum-goerli',
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
  Network.ETHEREUM_GOERLI,
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
  Network.DOGECOIN,
  Network.DOGECOIN_TESTNET,
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
  Network.ETHEREUM_GOERLI,
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
  Network.DOGECOIN,
  Network.DOGECOIN_TESTNET,
  Network.ZCASH,
  Network.BITCOIN_CASH,
]

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

export const isSameGetBlockNetwork = (network: Network) =>
  isUtxoBasedNetwork(network) ||
  isEvmBasedNetwork(network) ||
  isTronNetwork(network) ||
  isSolanaNetwork(network)

export enum MappedNetwork {
  HORIZEN_EON = 'horizen-eon-mainnet',
  DOGECOIN_MAINNET = 'dogecoin-mainnet',
  DOGECOIN_TESTNET = 'dogecoin-testnet',
}

export const MAPPED_NETWORK = {
  [Network.HORIZEN_EON]: MappedNetwork.HORIZEN_EON,
  [Network.DOGECOIN]: MappedNetwork.DOGECOIN_MAINNET,
  [Network.DOGECOIN_TESTNET]: MappedNetwork.DOGECOIN_TESTNET,
}

export const NATIVE_PREFIX_MAPPING: { [key: string]: string } = {
  [Network.KLAYTN]: 'klay_',
  [Network.KLAYTN_BAOBAB]: 'klay_',
}
