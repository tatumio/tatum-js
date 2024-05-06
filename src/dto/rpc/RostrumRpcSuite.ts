/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface TransactionGetParams {
  tx_hash: string
  verbose?: boolean
}

export interface TransactionGetResult {
  hex: string
}

export interface VerboseTransactionResult {
  hex: string
  txid: string
  hash: string
  size: number
  version: number
  locktime: number
  vin: Array<any>
  vout: Array<any>
  blockhash?: string
  confirmations?: number
  time?: number
  blocktime?: number
  fee?: number
  height?: number
}

export interface TransactionGetConfirmedBlockhashResult {
  block_hash: string
  block_height: number
}

export interface TransactionGetMerkleParams {
  tx_hash: string
  height?: number
}

export interface TransactionGetMerkleResult {
  block_height: number
  merkle: string[]
  pos: number
}

export interface TransactionIdFromPosParams {
  height: number
  tx_pos: number
  merkle?: boolean
}

export interface TransactionIdFromPosResult {
  tx_hash: string
  merkle?: string[]
}

export interface UtxoGetParams {
  tx_hash: string
  output_index?: number
  outpoint_hash?: string
}

export interface UtxoGetResult {
  status: string
  height: number
  value: number
  scripthash: string
  scriptpubkey: string
  spent?: {
    tx_pos?: number
    tx_hash?: string
    height?: number
  }
  token_id?: string
  token_amount?: number
  commitment?: string
  token_bitfield?: number
  tx_idem?: string
  tx_pos?: number
  group?: string
  token_id_hex?: string
  group_quantity?: number
  template_scripthash?: string
  template_argumenthash?: string
}

export interface TokenScripthashGetBalanceParams {
  scripthash: string
  cursor?: string
  token?: string
}

export interface TokenBalance {
  [tokenId: string]: number
}

export interface TokenGetBalanceResult {
  confirmed: TokenBalance
  unconfirmed: TokenBalance
  cursor?: string
}

export interface TokenScripthashGetHistoryParams {
  scripthash: string
  cursor?: string
  token?: string
}

export interface TokenAddressGetHistoryParams {
  address: string
  cursor?: string
  token?: string
}

export interface TokenHistoryTransaction {
  height: number
  tx_hash: string
  fee?: number
}

export interface TokenGetHistoryResult {
  transactions: TokenHistoryTransaction[]
  cursor?: string
}

export interface TokenScripthashGetMempoolParams {
  scripthash: string
  cursor?: string
  token?: string
}

export interface MempoolTransaction {
  height: number
  tx_hash: string
  fee: number
}

export interface TokenGetMempoolResult {
  transactions: MempoolTransaction[]
  cursor?: string
}

export interface TokenScripthashListUnspentParams {
  scripthash: string
  cursor?: string
  token?: string
}

export interface UnspentTokenOutput {
  tx_pos: number
  value: number
  tx_hash: string
  height: number
  token_id?: string
  token_amount: number
  commitment?: string
  token_id_hex?: string
  group?: string
  outpoint_hash?: string
}

export interface TokenListUnspentResult {
  unspent: UnspentTokenOutput[]
  cursor?: string
}

export interface TokenTransactionGetHistoryParams {
  token: string
  cursor?: string
  commitment?: string
}

export interface TokenTransactionHistory {
  height: number
  tx_hash: string
}

export interface TokenTransactionGetHistoryResult {
  history: TokenTransactionHistory[]
  cursor?: string
}

export interface TokenAddressGetBalanceParams {
  address: string
  cursor?: string
  token?: string
}

export interface TokenGenesisInfoResultBCH {
  tx_hash: string
  height: number
  bcmr?: {
    hash: string
    uris: string[]
  }
  crc20?: {
    symbol: string
    name: string
    decimals: number
    genesis_out: string
  }
}

export interface TokenGenesisInfoResultNexa {
  document_hash?: string
  document_url?: string
  decimal_places?: number
  height: number
  name?: string
  ticker?: string
  group?: string
  token_id_hex?: string
  txid: string
  txidem?: string
  op_return?: string
}

export interface TokenNftListParams {
  token: string
  cursor?: string
}

export interface NftBCH {
  token_id: string
  commitment: string
}

export interface NftNexa {
  group: string
  token_id_hex: string
}

export interface TokenNftListResultBCH {
  nft: NftBCH[]
  cursor?: string
}

export interface TokenNftListResultNexa {
  nft: NftNexa[]
  cursor?: string
}

export interface ServerVersionParams {
  client_name: string
  protocol_version: string
}

export interface ServerVersionResult {
  server_version: string
  protocol_version: string
}

export interface CashAccountQueryNameParams {
  name: string
  height: number
}

export interface CashAccountQueryResult {
  blockhash: string
  height: number
  tx: string
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
  blockchainAddressGetFirstUse: (
    params: AddressAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainGetFirstUseResult>>

  /**
   * Fetches the confirmed and unconfirmed transaction history of a Bitcoin Cash address or a script hash.
   * The method consolidates transaction information, including block height and transaction hashes, optionally filtering by UTXO type.
   *
   * @param params Parameters including the address or scripthash and an optional filter.
   * @returns A promise resolving to a list of transactions, each with details such as height, transaction hash, and optionally fee for mempool transactions.
   */
  blockchainAddressGetHistory: (
    params: AddressAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainHistoryResult[]>>

  /**
   * Fetches the unconfirmed transactions of a Bitcoin Cash address or a script hash from the mempool.
   * This method returns details of each transaction, including its hash, height, and fee, optionally filtering by UTXO type.
   *
   * @param params Parameters including the address or scripthash and an optional filter.
   * @returns A promise resolving to a list of mempool transactions, each with details such as transaction hash, height, and fee.
   */
  blockchainAddressGetMempool: (
    params: AddressAndFilterParam,
  ) => Promise<JsonRpcResponse<BlockchainMempoolResult[]>>

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
  blockchainBlockGet: (heightOrHash: string | number) => Promise<JsonRpcResponse<string>>

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
  blockchainBlockHeaderVerbose: (
    heightOrHash: string | number,
  ) => Promise<JsonRpcResponse<BlockHeaderVerboseResult>>

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

  /**
   * Broadcasts a raw transaction to the blockchain network.
   * The method returns the transaction hash if the broadcast is successful.
   */
  blockchainTransactionBroadcast: (raw_tx: string) => Promise<JsonRpcResponse<string>>

  /**
   * Fetches a transaction by its hash.
   * The method returns the transaction in raw format by default.
   * If the verbose flag is set to true, the method returns additional details about the transaction.
   *
   * @param params The parameters for the transaction query, including the transaction hash and an optional verbose flag.
   * @returns A promise resolving to the transaction details.
   */
  blockchainTransactionGet: (
    params: TransactionGetParams,
  ) => Promise<JsonRpcResponse<TransactionGetResult | VerboseTransactionResult>>

  /**
   * Fetches the block hash and height of a transaction by its hash.
   *
   * @param tx_hash The hash of the transaction to fetch the block hash and height for.
   * @returns A promise resolving to the block hash and height of the transaction.
   */
  blockchainTransactionGetConfirmedBlockhash: (
    tx_hash: string,
  ) => Promise<JsonRpcResponse<TransactionGetConfirmedBlockhashResult>>

  /**
   * Fetches the Merkle proof of a transaction by its hash.
   * The method returns the block height, the Merkle proof, and the position of the transaction in the block.
   *
   * @param params The parameters for the Merkle proof query, including the transaction hash and an optional block height.
   * @returns A promise resolving to the Merkle proof details.
   */
  blockchainTransactionGetMerkle: (
    params: TransactionGetMerkleParams,
  ) => Promise<JsonRpcResponse<TransactionGetMerkleResult>>

  /**
   * Fetches the transaction hash by its position in a block.
   * The method returns the transaction hash and optionally the Merkle proof for the transaction.
   *
   * @param params The parameters for the transaction ID query, including the block height and transaction position.
   * @returns A promise resolving to the transaction hash and optionally the Merkle proof.
   */
  blockchainTransactionIdFromPos: (
    params: TransactionIdFromPosParams,
  ) => Promise<JsonRpcResponse<TransactionIdFromPosResult>>

  /**
   * Fetches the unspent transaction output (UTXO) for a transaction output.
   * The method returns the status of the UTXO, including its height, value, and script hash.
   *
   * @param params The parameters for the UTXO query, including the transaction hash and output index.
   * @returns A promise resolving to the UTXO details.
   */
  blockchainUtxoGet: (params: UtxoGetParams) => Promise<JsonRpcResponse<UtxoGetResult>>

  /**
   * Fetches the confirmed and unconfirmed token balances of a specified Bitcoin Cash script hash.
   * The function allows for optional filtering of the balance by token ID.
   *
   * @param params The parameters for the balance query, including the script hash and an optional token ID.
   * @returns A promise that resolves to the balance of the script hash, separated into confirmed and unconfirmed amounts.
   */
  tokenScripthashGetBalance: (
    params: TokenScripthashGetBalanceParams,
  ) => Promise<JsonRpcResponse<TokenGetBalanceResult>>

  /**
   * Fetches the confirmed and unconfirmed transaction history of a Bitcoin Cash script hash.
   * The method consolidates transaction information, including block height and transaction hashes, optionally filtering by token ID.
   *
   * @param params Parameters including the script hash and an optional token ID.
   * @returns A promise resolving to a list of transactions, each with details such as height and transaction hash.
   */
  tokenScripthashGetHistory: (
    params: TokenScripthashGetHistoryParams,
  ) => Promise<JsonRpcResponse<TokenGetHistoryResult>>

  /**
   * Fetches the unconfirmed transactions of a Bitcoin Cash script hash from the mempool.
   * This method returns details of each transaction, including its hash, height, and fee, optionally filtering by token ID.
   *
   * @param params Parameters including the script hash and an optional token ID.
   * @returns A promise resolving to a list of mempool transactions, each with details such as transaction hash, height, and fee.
   */
  tokenScripthashGetMempool: (
    params: TokenScripthashGetMempoolParams,
  ) => Promise<JsonRpcResponse<TokenGetMempoolResult>>

  /**
   * Fetches an ordered list of unspent transaction outputs (UTXOs) sent to a Bitcoin Cash script hash.
   * The query can optionally be filtered to include all UTXOs, only token UTXOs, or exclude token UTXOs.
   *
   * @param params Parameters including the script hash and an optional token ID.
   * @returns A promise resolving to a JSON RPC response wrapping a list of UTXOs.
   */
  tokenScripthashListUnspent: (
    params: TokenScripthashListUnspentParams,
  ) => Promise<JsonRpcResponse<TokenListUnspentResult>>

  /**
   * Fetches the transaction history of a token.
   * The method consolidates transaction information, including block height and transaction hashes, optionally filtering by commitment.
   *
   * @param params Parameters including the token ID and an optional commitment.
   * @returns A promise resolving to a list of transactions, each with details such as height and transaction hash.
   */
  tokenTransactionGetHistory: (
    params: TokenTransactionGetHistoryParams,
  ) => Promise<JsonRpcResponse<TokenTransactionGetHistoryResult>>

  /**
   * Fetches the confirmed and unconfirmed balances of a specified Bitcoin Cash address.
   * The function allows for optional filtering of the balance by token ID.
   *
   * @param params The parameters for the balance query, including the address and an optional token ID.
   * @returns A promise that resolves to the balance of the address, separated into confirmed and unconfirmed amounts.
   */
  tokenAddressGetBalance: (
    params: TokenAddressGetBalanceParams,
  ) => Promise<JsonRpcResponse<TokenGetBalanceResult>>

  /**
   * Fetches the confirmed and unconfirmed transaction history of a Bitcoin Cash address.
   * The method consolidates transaction information, including block height and transaction hashes, optionally filtering by token ID.
   *
   * @param params Parameters including the address and an optional token ID.
   * @returns A promise resolving to a list of transactions, each with details such as height and transaction hash.
   */
  tokenAddressGetHistory: (
    params: TokenAddressGetHistoryParams,
  ) => Promise<JsonRpcResponse<TokenGetHistoryResult>>

  /**
   * Fetches the unconfirmed transactions of a Bitcoin Cash address from the mempool.
   * This method returns details of each transaction, including its hash, height, and fee, optionally filtering by token ID.
   *
   * @param params Parameters including the address and an optional token ID.
   * @returns A promise resolving to a list of mempool transactions, each with details such as transaction hash, height, and fee.
   */
  tokenAddressGetMempool: (
    params: TokenAddressGetHistoryParams,
  ) => Promise<JsonRpcResponse<TokenGetMempoolResult>>

  /**
   * Fetches an ordered list of unspent transaction outputs (UTXOs) sent to a Bitcoin Cash address.
   * The query can optionally be filtered to include all UTXOs, only token UTXOs, or exclude token UTXOs.
   *
   * @param params Parameters including the address and an optional token ID.
   * @returns A promise resolving to a JSON RPC response wrapping a list of UTXOs.
   */
  tokenAddressListUnspent: (
    params: TokenAddressGetHistoryParams,
  ) => Promise<JsonRpcResponse<TokenListUnspentResult>>

  /**
   * Fetches the genesis information of a token by its token ID.
   * The method returns details such as the transaction hash, block height, and additional information specific to the token type.
   *
   * @param tokenId The token ID to fetch the genesis information for.
   * @returns A promise resolving to the genesis information of the token.
   */
  tokenGenesisInfo: (
    tokenId: string,
  ) => Promise<JsonRpcResponse<TokenGenesisInfoResultBCH | TokenGenesisInfoResultNexa>>

  /**
   * Fetches the list of non-fungible tokens (NFTs) associated with a token.
   * The method returns the list of NFTs, including the token ID and commitment.
   *
   * @param params The parameters for the NFT list query, including the token ID and an optional cursor.
   * @returns A promise resolving to the list of NFTs associated with the token.
   */
  tokenNftList: (
    params: TokenNftListParams,
  ) => Promise<JsonRpcResponse<TokenNftListResultBCH | TokenNftListResultNexa>>

  /**
   * Fetches the version information of the server.
   * The method returns the server version and protocol version.
   */
  serverVersion: (params: ServerVersionParams) => Promise<JsonRpcResponse<[string, string]>>

  cashAccountQueryName: (
    params: CashAccountQueryNameParams,
  ) => Promise<JsonRpcResponse<CashAccountQueryResult>>

  serverBanner: () => Promise<JsonRpcResponse<string>>
}
