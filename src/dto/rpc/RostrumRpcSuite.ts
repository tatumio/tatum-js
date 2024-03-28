import { JsonRpcResponse } from '../JsonRpcResponse.dto'

export interface BlockAddressDecodeResult {
  payload: string
  type: string
  isTokenAware: boolean
}

export type Filter = 'include_tokens' | 'tokens_only' | 'exclude_token'

export interface AddressAndFilterParam {
  address: string
  filter?: Filter
}

export interface ScriptHashAndFilterParam {
  scripthash: string
  filter?: Filter
}

/**
 * The expected result format for balance queries.
 * Provides both confirmed and unconfirmed balances of the address.
 */
export interface BlockchainGetBalanceResult {
  confirmed: number
  unconfirmed: number
}

export interface BlockchainGetFirstUseResult {
  block_hash: string
  block_height: number
  tx_hash: string
}

export interface BlockchainHistoryResult {
  height: number
  tx_hash: string
  fee?: number
}

export interface BlockchainMempoolResult {
  tx_hash: string
  height: number
  fee: number
}

export interface BlockchainAddressToScriptHashResult {
  scripthash: string
}

export interface BlockchainUnspentOutputResult {
  height: number
  tx_pos: number
  tx_hash: string
  value: number
  outpoint_hash?: string
}

export interface AddressSubscribeResult {
  status: string
}

export interface AddressUnsubscribeResult {
  success: boolean
}

export interface BlockHeaderParams {
  height: number
  cp_height?: number
}

export interface BlockHeaderResult {
  branch?: string[]
  header: string
  root?: string
}

export interface BlockHeaderVerboseResult {
  bits: number
  hash: string
  height: number
  hex: string
  mediantime: number
  merkleroot: string
  nonce: number | string
  previousblockhash: string
  time: number
  version: number
  // Fields specific to Nexa or other additional fields
  ancestorhash?: string
  chainwork?: string
  feepoolamt?: number
  minerdata?: string
  size?: number
  txcount?: number
  txfilter?: string
  utxocommitment?: string
}

export interface BlockHeadersParams {
  start_height: number
  count: number
  cp_height?: number
}

export interface BlockHeadersResult {
  count: number
  hex: string
  max: number
  root?: string
  branch?: string[]
}

export interface HexHeightResult {
  hex: string
  height: number
}

export interface RostrumRpcInterface {
  /**
   * Decodes a Bitcoin Cash or Nexa address to its raw payload. This function is designed
   * to be useful for clients that need to understand the encoded contents of an address
   * but do not have the necessary local libraries for decoding.
   *
   * @param address The address as a Cash Address string (with or without the prefix).
   *                Some server implementations might also support Legacy (base58)
   *                addresses but are not required to do so by this specification.
   * @returns A promise that resolves to the decoded payload of the address, including
   *          the type of data it represents and its token awareness status.
   */
  blockchainAddressDecode: (address: string) => Promise<JsonRpcResponse<BlockAddressDecodeResult>>

  /**
   * Retrieves the confirmed and unconfirmed balances of a specified Bitcoin Cash address.
   * The function allows for optional filtering of the balance by UTXO type.
   *
   * @param params The parameters for the balance query, including the address and an optional filter.
   * @returns A promise that resolves to the balance of the address, separated into confirmed and unconfirmed amounts.
   */
  blockchainAddressGetBalance: (
    params: AddressAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainGetBalanceResult>>

  /**
   * Fetches the first occurrence of usage of an address or scripthash on the blockchain.
   * This method helps in identifying the initial transaction that involved the address or scripthash.
   *
   * @param params Parameters including the address or scripthash and an optional filter.
   * @returns A promise resolving to the first usage details, including block hash, block height, and transaction hash.
   */
  blockchainGetFirstUse: (
    params: AddressAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainGetFirstUseResult>>

  /**
   * Fetches the confirmed and unconfirmed transaction history of a Bitcoin Cash address or a script hash.
   * The method consolidates transaction information, including block height and transaction hashes, optionally filtering by UTXO type.
   *
   * @param params Parameters including the address or scripthash and an optional filter.
   * @returns A promise resolving to a list of transactions, each with details such as height, transaction hash, and optionally fee for mempool transactions.
   */
  blockchainGetHistory: (params: AddressAndFilterParam) => Promise<JsonRpcResponse<BlockchainHistoryResult[]>>

  /**
   * Fetches the unconfirmed transactions of a Bitcoin Cash address or a script hash from the mempool.
   * This method returns details of each transaction, including its hash, height, and fee, optionally filtering by UTXO type.
   *
   * @param params Parameters including the address or scripthash and an optional filter.
   * @returns A promise resolving to a list of mempool transactions, each with details such as transaction hash, height, and fee.
   */
  blockchainGetMempool: (params: AddressAndFilterParam) => Promise<JsonRpcResponse<BlockchainMempoolResult[]>>

  /**
   * Converts a Bitcoin Cash or Nexa address to its corresponding script hash.
   * This method is useful for clients that prefer working with script hashes but lack the local libraries for generation.
   *
   * @param params An object containing the address to be converted.
   * @returns A promise resolving to the script hash corresponding to the given address.
   */
  blockchainAddressToScriptHash: (
    address: string,
  ) => Promise<JsonRpcResponse<BlockchainAddressToScriptHashResult>>

  /**
   * Fetches an ordered list of unspent transaction outputs (UTXOs) sent to a Bitcoin Cash address or a script hash.
   * The query can optionally be filtered to include all UTXOs, only token UTXOs, or exclude token UTXOs.
   *
   * @param params Parameters including the address or script hash and an optional filter.
   * @returns A promise resolving to a JSON RPC response wrapping a list of UTXOs.
   */
  blockchainListUnspent: (
    params: AddressAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainUnspentOutputResult[]>>

  /**
   * Subscribes to notifications for changes in the status of a specified Bitcoin Cash or Nexa address.
   * Returns a JsonRpcResponse wrapper containing the initial status of the address as the result.
   *
   * @param address The address to subscribe to.
   * @returns A promise resolving to a JsonRpcResponse with the initial status of the subscribed address.
   */
  blockchainAddressSubscribe: (address: string) => Promise<JsonRpcResponse<AddressSubscribeResult>>

  /**
   * Unsubscribes from notifications for a specified Bitcoin Cash or Nexa address.
   * This prevents the client from receiving future notifications if the status of the address changes.
   * The method returns true if the address was successfully unsubscribed from, otherwise false.
   * A false return value may indicate that the address was not previously subscribed or the subscription was dropped.
   *
   * @param address The address to unsubscribe from.
   * @returns A promise that resolves to a JsonRpcResponse wrapping the success status of the unsubscription attempt.
   */
  blockchainAddressUnsubscribe: (address: string) => Promise<JsonRpcResponse<AddressUnsubscribeResult>>

  /**
   * Fetches the block hash of a block by its height.
   *
   * @param heightOrHash The height or hash of the block to fetch.
   * @returns A promise resolving to the hash of the block at the specified height.
   */
  blockchainBlockGet: (heightOrHash: string) => Promise<JsonRpcResponse<string>>

  /**
   * Fetches the block header of a block by its height.
   *
   * @param params The parameters for the block header query, including the height of the block.
   * @returns A promise resolving to the header of the block at the specified height.
   */
  blockchainBlockHeader: (params: BlockHeaderParams) => Promise<JsonRpcResponse<BlockHeaderResult | string>>

  /**
   * Fetches the block header of a block by its height.
   *
   * @param heightOrHash The height or hash of the block to fetch.
   * @returns A promise resolving to the header of the block at the specified height.
   */
  blockchainBlockHeaderVerbose: (heightOrHash: string) => Promise<JsonRpcResponse<BlockHeaderVerboseResult>>

  /**
   * Fetches a range of block headers from a specified starting height.
   *
   * @param params The parameters for the block headers query, including the starting height and the count of headers to fetch.
   * @returns A promise resolving to the requested block headers.
   */
  blockchainBlockHeaders: (params: BlockHeadersParams) => Promise<JsonRpcResponse<BlockHeadersResult>>

  /**
   * Fetches the estimated fee for a transaction to be included in a block within a specified number of blocks.
   *
   * @param blocks The number of blocks in which the transaction should be included.
   * @returns A promise resolving to the estimated fee for the transaction.
   */
  blockchainEstimateFee: (blocks: number) => Promise<JsonRpcResponse<number>>

  /**
   * Fetches the latest block height and hash.
   *
   * @returns A promise resolving to the latest block height and hash.
   */
  blockchainHeadersSubscribe: () => Promise<JsonRpcResponse<HexHeightResult>>

  /**
   * Fetches the latest block height and hash.
   *
   * @returns A promise resolving to the latest block height and hash.
   */
  blockchainHeadersTip: () => Promise<JsonRpcResponse<HexHeightResult>>

  /**
   * Fetches the current relay fee for the blockchain.
   *
   * @returns A promise resolving to the current relay fee.
   */
  blockchainRelayFee: () => Promise<JsonRpcResponse<number>>

  /**
   * Fetches the confirmed and unconfirmed balances of a specified Bitcoin Cash script hash.
   * The function allows for optional filtering of the balance by UTXO type.
   *
   * @param params The parameters for the balance query, including the script hash and an optional filter.
   * @returns A promise that resolves to the balance of the script hash, separated into confirmed and unconfirmed amounts.
   */
  blockchainScriptHashGetBalance: (
    params: ScriptHashAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainGetBalanceResult>>

  /**
   * Fetches the first occurrence of usage of a script hash on the blockchain.
   * This method helps in identifying the initial transaction that involved the script hash.
   *
   * @param params Parameters including the script hash and an optional filter.
   * @returns A promise resolving to the first usage details, including block hash, block height, and transaction hash.
   */
  blockchainScriptHashGetFirstUse: (
    params: ScriptHashAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainGetFirstUseResult>>

  /**
   * Fetches the confirmed and unconfirmed transaction history of a Bitcoin Cash script hash.
   * The method consolidates transaction information, including block height and transaction hashes, optionally filtering by UTXO type.
   *
   * @param params Parameters including the script hash and an optional filter.
   * @returns A promise resolving to a list of transactions, each with details such as height, transaction hash, and optionally fee for mempool transactions.
   */
  blockchainScriptHashGetHistory: (
    params: ScriptHashAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainHistoryResult[]>>

  /**
   * Fetches the unconfirmed transactions of a Bitcoin Cash script hash from the mempool.
   * This method returns details of each transaction, including its hash, height, and fee, optionally filtering by UTXO type.
   *
   * @param params Parameters including the script hash and an optional filter.
   * @returns A promise resolving to a list of mempool transactions, each with details such as transaction hash, height, and fee.
   */
  blockchainScriptHashGetMempool: (
    params: ScriptHashAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainMempoolResult[]>>

  /**
   * Fetches an ordered list of unspent transaction outputs (UTXOs) sent to a Bitcoin Cash script hash.
   * The query can optionally be filtered to include all UTXOs, only token UTXOs, or exclude token UTXOs.
   *
   * @param params Parameters including the script hash and an optional filter.
   * @returns A promise resolving to a JSON RPC response wrapping a list of UTXOs.
   */
  blockchainScriptHashListUnspent: (
    params: ScriptHashAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainUnspentOutputResult[]>>

  /**
   * Subscribes to notifications for changes in the status of a specified Bitcoin Cash script hash.
   * Returns a JsonRpcResponse wrapper containing the initial status of the script hash as the result.
   *
   * @param scripthash The script hash to subscribe to.
   * @returns A promise resolving to a JsonRpcResponse with the initial status of the subscribed script hash.
   */
  blockchainScriptHashSubscribe: (scripthash: string) => Promise<JsonRpcResponse<AddressSubscribeResult>>

  /**
   * Unsubscribes from notifications for a specified Bitcoin Cash script hash.
   * This prevents the client from receiving future notifications if the status of the script hash changes.
   * The method returns true if the script hash was successfully unsubscribed from, otherwise false.
   * A false return value may indicate that the script hash was not previously subscribed or the subscription was dropped.
   *
   * @param scripthash The script hash to unsubscribe from.
   * @returns A promise that resolves to a JsonRpcResponse wrapping the success status of the unsubscription attempt.
   */
  blockchainScriptHashUnsubscribe: (scripthash: string) => Promise<JsonRpcResponse<AddressUnsubscribeResult>>
}
