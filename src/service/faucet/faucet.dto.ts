export type Chain =
  | 'ethereum-sepolia'
  | 'ethereum-holesky'
  | 'polygon-mumbai'
  | 'eon-testnet'
  | 'celo-testnet'
  | 'bsc-testnet'

export interface TxIdResponse {
  txId: string
}

export interface FaucetRequest {
  /**
   * One of the supported testnet chains
   */
  chain: Chain

  /**
   * Address of wallet requesting funds
   */
  address: string
}
