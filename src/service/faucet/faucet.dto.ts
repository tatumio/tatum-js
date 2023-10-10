export type FaucetNetwork =
  | 'ethereum-sepolia'
  | 'ethereum-holesky'
  | 'polygon-mumbai'
  | 'horizen-eon-gobi' // eon-testnet
  | 'celo-testnet'
  | 'bsc-testnet'

export interface TxIdResponse {
  txId: string
}

export interface FaucetRequest {
  /**
   * Address of wallet requesting funds
   */
  address: string

  /**
   * One of the supported testnet chains
   * By default it is selected based on network
   */
  chain?: FaucetNetwork
}
