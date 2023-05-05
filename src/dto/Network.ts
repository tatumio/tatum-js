export enum Network {
  // Mainnets
  ALGORAND = 'algorand-mainnet',
  ARBITRUM_NOVA = 'arb-nova-mainnet',
  ARBITRUM_ONE = 'arb-one-mainnet',
  AURORA = 'aurora-mainnet',
  AVALANCHE_C = 'avax-mainnet',
  AVALANCHE_P = 'avax-p-mainnet',
  AVALANCHE_X = 'avax-x-mainnet',
  BINANCE_SMART_CHAIN = 'bsc-mainnet',
  BITCOIN = 'bitcoin-mainnet',
  BITCOIN_CASH = 'bch-mainnet',
  CARDANO = 'cardano-mainnet',
  CELO = 'celo-mainnet',
  CRONOS = 'cro-mainnet',
  DOGECOIN = 'doge-mainnet',
  EOS = 'eos-mainnet',
  ETHEREUM = 'ethereum-mainnet',
  ETHEREUM_CLASSIC = 'ethereum-classic-mainnet',
  FANTOM = 'fantom-mainnet',
  FLOW = 'flow-mainnet',
  GNOSIS = 'gno-mainnet',
  HARMONY_ONE_SHARD_0 = 'one-mainnet-s0',
  KLAYTN = 'klaytn-cypress',
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
  XDC = 'xdc-mainnet',
  XRP = 'ripple-mainnet',
  ZCASH = 'zcash-mainnet',
  ZILLIQA = 'zilliqa-mainnet',

  // Testnets
  ALGORAND_TESTNET = 'algorand-testnet',
  ARBITRUM_NOVA_TESTNET = 'arb-testnet',
  AURORA_TESTNET = 'aurora-testnet',
  AVALANCHE_C_TESTNET = 'avax-testnet',
  AVALANCHE_P_TESTNET = 'avax-p-testnet',
  AVALANCHE_X_TESTNET = 'avax-x-testnet',
  BINANCE_SMART_CHAIN_TESTNET = 'bsc-testnet',
  BITCOIN_TESTNET = 'bitcoin-testnet',
  BITCOIN_CASH_TESTNET = 'bch-testnet',
  CARDANO_PREPROD = 'cardano-preprod',
  CELO_ALFAJORES = 'celo-testnet',
  CRONOS_TESTNET = 'cro-testnet',
  DOGECOIN_TESTNET = 'doge-testnet',
  ETHEREUM_GOERLI = 'ethereum-goerli',
  ETHEREUM_SEPOLIA = 'ethereum-sepolia',
  EOS_TESTNET = 'eos-testnet',
  FANTOM_TESTNET = 'fantom-testnet',
  FLOW_TESTNET = 'flow-testnet',
  GNOSIS_TESTNET = 'gno-testnet',
  HARMONY_ONE_TESTNET_SHARD_0 = 'one-testnet-s0',
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
  XDC_TESTNET = 'xdc-testnet',
  XRP_TESTNET = 'ripple-testnet',
  ZCASH_TESTNET = 'zcash-testnet',
  ZILLIQA_TESTNET = 'zilliqa-testnet',
}

export const EVM_BASED_NETWORKS = [
  Network.ETHEREUM,
  Network.ETHEREUM_SEPOLIA,
  Network.ETHEREUM_CLASSIC,
  Network.ETHEREUM_GOERLI,
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
  Network.BINANCE_SMART_CHAIN,
  Network.BINANCE_SMART_CHAIN_TESTNET,
  Network.VECHAIN,
  Network.VECHAIN_TESTNET,
  Network.XDC,
  Network.XDC_TESTNET,
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

export const DATA_API_UTXO_NETWORKS = [
  Network.BITCOIN,
  Network.BITCOIN_TESTNET,
  Network.LITECOIN,
  Network.LITECOIN_TESTNET,
  Network.CARDANO,
  Network.CARDANO_PREPROD,
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
]

export const isEvmBasedNetwork = (network: Network) => {
  return EVM_BASED_NETWORKS.includes(network)
}

export const isUtxoBasedNetwork = (network: Network) => {
  return UTXO_BASED_NETWORKS.includes(network)
}

export const isXrpNetwork = (network: Network) => {
  return [Network.XRP, Network.XRP_TESTNET].includes(network)
}

export const isDataApiEvmEnabledNetwork = (network: Network) => {
  return DATA_API_EVM_NETWORKS.includes(network)
}

export const isDataApiUtxoEnabledNetwork = (network: Network) => {
  return DATA_API_UTXO_NETWORKS.includes(network)
}
