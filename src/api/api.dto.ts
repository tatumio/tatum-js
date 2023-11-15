import { DefaultParamsType } from '../connector/connector.dto'
import { Network } from '../dto'

export type TokenType = 'native' | 'fungible' | 'nft' | 'multitoken'
export type TxSubtype = 'incoming' | 'outgoing' | 'zero-transfer'
export type TxType = 'fungible' | 'nft' | 'multitoken' | 'native' | 'internal'

export type Chain =
  | 'ethereum'
  | 'ethereum-sepolia'
  | 'celo'
  | 'celo-testnet'
  | 'bsc'
  | 'bsc-testnet'
  | 'polygon'
  | 'polygon-mumbai'

export type ChainUtxoEnum =
  | 'bitcoin'
  | 'bitcoin-testnet'
  | 'litecoin'
  | 'litecoin-testnet'
  | 'doge'
  | 'doge-testnet'
  | 'cardano'
  | 'cardano-preprod'

export enum ChainEnum {
  ETHEREUM = 'ethereum',
  ETHEREUM_SEPOLIA = 'ethereum-sepolia',
  CELO = 'celo',
  CELO_TESTNET = 'celo-testnet',
  BSC = 'bsc',
  BSC_TESTNET = 'bsc-testnet',
  POLYGON = 'polygon',
  POLYGON_MUMBAI = 'polygon-mumbai',
}

export function networkToChain(network: Network): Chain {
  switch (network) {
    case Network.ETHEREUM:
      return ChainEnum.ETHEREUM
    case Network.ETHEREUM_SEPOLIA:
      return ChainEnum.ETHEREUM_SEPOLIA
    case Network.CELO:
      return ChainEnum.CELO
    case Network.CELO_ALFAJORES:
      return ChainEnum.CELO_TESTNET
    case Network.BINANCE_SMART_CHAIN:
      return ChainEnum.BSC
    case Network.BINANCE_SMART_CHAIN_TESTNET:
      return ChainEnum.BSC_TESTNET
    case Network.POLYGON:
      return ChainEnum.POLYGON
    case Network.POLYGON_MUMBAI:
      return ChainEnum.POLYGON_MUMBAI
    default:
      throw new Error(`Unsupported network ${network}`)
  }
}

export interface ApiBalanceRequest extends DefaultParamsType {
  /**
   * Blockchain network
   */
  chain: Network

  /**
   * Addresses
   */
  addresses: string

  /**
   * Optional. Token types
   */
  tokenTypes?: 'nft' | 'multitoken' | 'fungible' | string

  /**
   * Optional. The option to exclude metadata from the response.
   */
  excludeMetadata?: boolean

  /**
   * Optional. The number of items per page (default is 50).
   */
  pageSize?: number

  /**
   * Optional. The offset to obtain next page of the data.
   */
  offset?: number
}

export interface ApiBalanceResponse {
  /**
   * Blockchain network
   */
  chain: Chain

  /**
   * Token type
   */
  type: 'native' | 'fungible' | 'nft' | 'multitoken'

  /**
   * Address
   */
  address: string

  /**
   * Balance of the address.
   */
  balance: string

  /**
   * Token contract address
   */
  tokenAddress: string

  /**
   * Block number of the last balance update.
   */
  lastUpdatedBlockNumber: number
}

export interface ApiMetadataRequest extends DefaultParamsType {
  /**
   * Blockchain network
   */
  chain: Chain

  /**
   * Token contract address
   */
  tokenAddress: string

  /**
   * Optional. The IDs of the tokens to get metadata for. It is possible to enter list of multiple IDs as a comma separated string.
   */
  tokenIds?: string
}

export interface ApiMetadataResponse {
  /**
   * Blockchain network
   */
  chain: Chain

  /**
   * ID of the token.
   */
  tokenId: string

  /**
   * Token contract address
   */
  tokenAddress: string

  /**
   * Token type
   */
  tokenType: 'native' | 'fungible' | 'nft' | 'multitoken'

  /**
   * Metadata URL of the token. This data doesn't have to be present. The safest way to obtain them in that case is from the NFT Contract.tokenURI() method call.
   */
  metadataURI: string

  /**
   * Metadata scheme obtained from the url. This data don't have to be present. The safest way to obtain them in that case is from the NFT Contract.tokenURI() method call.
   */
  metadata: object
}

export interface ApiCollectionsRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: ChainEnum
  /**
   * The blockchain addresses of the collections.
   * It is possible to enter list of up to 10 addresses as a comma separated string.
   *
   */
  collectionAddresses: string
  /**
   * The option to select only specific token types.
   * It is possible to enter list of multiple types as a comma separated string.
   * Use nft (includes ERC-721 and ERC-1155) or multitoken (ERC-1155 only).
   *
   */
  tokenTypes?: 'nft' | 'multitoken'
  /**
   * The option to exclude metadata from the response.
   */
  excludeMetadata?: boolean
  /**
   * The number of items per page (default is 50).
   */
  pageSize?: number
  /**
   * The offset to obtain next page of the data.
   */
  offset?: number
}

export interface FungibleInfo {
  /**
   * Symbol of the fungible token.
   */
  symbol: string
  /**
   * Full name of the fungible token
   */
  name: string
  /**
   * Total supply of the fungible token.
   */
  supply: string
  /**
   * Number of decimal places for the fungible token.
   */
  decimals: number
  /**
   * Type of the token - fungible
   */
  tokenType: 'fungible'
  /**
   * Maximum supply cap of the fungible token.
   */
  cap: string
}

export interface MultitokenInfo {
  /**
   * Blockchain network
   */
  chain: Chain
  /**
   * Symbol of the fungible token.
   */
  symbol: string
  /**
   * Full name of the fungible token
   */
  name: string
  /**
   * Type of the token - fungible
   */
  tokenType: 'multitoken'
}

export interface NftInfo {
  /**
   * Blockchain network
   */
  chain: Chain
  /**
   * Symbol of the fungible token.
   */
  symbol: string
  /**
   * Full name of the fungible token
   */
  name: string
  /**
   * Total supply of the fungible token.
   */
  supply: string
  /**
   * Type of the token - fungible
   */
  tokenType: 'nft'
}

export interface NftTokenInfo {
  /**
   * Blockchain network
   */
  chain: Chain
  /**
   * Symbol of the fungible token.
   */
  symbol: string
  /**
   * Full name of the fungible token
   */
  name: string
  /**
   * Metadata of the token
   */
  metadata: object
  /**
   * Metadata URI to obtain metadata of the token
   */
  metadataURI: string
  /**
   * Type of the token - fungible
   */
  tokenType: 'nft'
}

export interface ApiCollectionsResponse {
  chain?: Chain
  tokenId?: string
  tokenAddress?: string
  tokenType?: TokenType
  metadataURI?: string
  metadata?: object
}

export interface ApiOwnersRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: ChainEnum
  /**
   * The blockchain address of the token (NFT collection or any fungible token).
   */
  tokenAddress: string
  /**
   * The ID of a specific NFT token.
   */
  tokenId?: string
  /**
   * The number of items per page (default is 50).
   */
  pageSize?: number
  /**
   * The offset to obtain next page of the data.
   */
  offset?: number
}

export interface ApiCheckOwnersRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: ChainEnum
  /**
   * The blockchain address of the wallet.
   */
  address: string
  /**
   * The blockchain address of the token (NFT collection or any fungible token).
   */
  tokenAddress: string
  /**
   * The ID of a specific NFT token.
   */
  tokenId?: string
}

export interface ApiTxData {
  chain: Chain
  /**
   * The transaction hash.
   */
  hash: string
  /**
   * The address involved in the transaction.
   */
  address: string
  /**
   * The counter address involved in the transaction (optional).
   */
  counterAddress?: string
  /**
   * The token address involved in the transaction (optional).
   */
  tokenAddress?: string
  /**
   * The ID of the token involved in the transaction (optional).
   */
  tokenId?: string
  /**
   * The block number in which the transaction occurred.
   */
  blockNumber: number
  /**
   * The transaction index within the block.
   */
  transactionIndex: number
  transactionType: TxType
  transactionSubtype: TxSubtype
  /**
   * The amount transferred in the transaction.
   */
  amount: string
  /**
   * The timestamp when the transaction occurred.
   */
  timestamp: number
}

export interface TxIdResponse {
  txId: string
}

export interface ApiGetTxByHashRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: ChainEnum
  /**
   * Hash of the transaction.
   */
  hash: string
}

export interface ApiTransactionsRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: Chain
  /**
   * The blockchain public wallet addresses.
   * It is possible to enter list of up to 10 addresses as a comma separated string.
   *
   */
  addresses?: string
  /**
   * The option to filter transaction based on types.
   * It is possible to enter list of multiple types as a comma separated string.
   * Use fungible (ERC-20), nft (ERC-721 and ERC-1155), multitoken (ERC-1155), native or internal.
   *
   */
  transactionTypes?: 'fungible' | 'nft' | 'multitoken' | 'native' | 'internal'
  /**
   * The option to filter transaction based on subtype.
   */
  transactionSubtype?: 'incoming' | 'outgoing' | 'zero-transfer'
  /**
   * Address of a token (smart contract).
   */
  tokenAddress?: string
  /**
   * ID of a token.
   */
  tokenId?: string
  /**
   * Transactions from this block onwards will be included.
   */
  blockFrom?: number
  /**
   * Transactions up to this block will be included.
   */
  blockTo?: number
  /**
   * The number of items per page (default is 50).
   */
  pageSize?: number
  /**
   * The offset to obtain next page of the data.
   */
  offset?: number
}

export interface ApiTransactionByHashRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: ChainEnum
  /**
   * Hash of the transaction.
   */
  hash: string
}

export interface ApiEventsRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: ChainEnum
  /**
   * The blockchain addresses of the contracts where requested events were emitted.
   * It is possible to enter list of up to 10 addresses as a comma separated string.
   *
   */
  contractAddresses: string
  /**
   * First block to start from (including this one).
   */
  blockFrom: number
  /**
   * Last block to finish on (including this one).
   */
  blockTo: number
  /**
   * The type of events that should be returned, which comes with decoded data in the response
   * (cannot be used together with signatures).
   *
   */
  eventType: 'tokenTransfer' | 'multitokenTransfer' | 'stablecoinTransfer' | 'uniswapTrade'
  /**
   * The types of events that should be returned, specified by hashed signature
   * (cannot be used together with eventType).
   * It is possible to enter list of multiple signatures as a comma separated string.
   *
   */
  signatures?: string
  /**
   * The number of items per page (default is 50).
   */
  pageSize?: number
  /**
   * The offset to obtain next page of the data.
   */
  offset?: number
}

interface DecodedDataCommon {
  label: string
  type: string
  subtype: string
  from: string
  to: string
}

interface FungibleTransfer extends DecodedDataCommon {
  decimals?: number
  value: string
}

interface StablecoinTransfer extends FungibleTransfer {
  stablecoin: string
}

interface NftTransfer extends DecodedDataCommon {
  tokenId: string
}

interface MultitokenTransfer extends DecodedDataCommon {
  operator: string
}

interface MultitokenTransferSingle extends MultitokenTransfer {
  multitokenId: string
  multitokenValue: string
}

interface MultitokenTransferBatch extends MultitokenTransfer {
  multitokenIds: string[]
  multitokenValues: string[]
}

interface UniswapTrade extends DecodedDataCommon {
  token0?: string
  token1?: string
  partiallyRaw?: boolean
}

interface UniswapTradeV2 extends UniswapTrade {
  amount0In: string
  amount1In: string
  amount0Out: string
  amount1Out: string
}

interface UniswapTradeV3 extends UniswapTrade {
  amount0: string
  amount1: string
  sqrtPriceX96: string
  liquidity: string
  tick: number
}

export type DecodedData =
  | FungibleTransfer
  | StablecoinTransfer
  | NftTransfer
  | MultitokenTransferSingle
  | MultitokenTransferBatch
  | UniswapTradeV2
  | UniswapTradeV3

export type RawData = {
  topic_0?: string
  topic_1?: string
  topic_2?: string
  topic_3?: string
  data?: string
}

export interface Event {
  chain?: Chain
  /**
   * The address associated with the event.
   */
  address?: string
  /**
   * The block number where the event was recorded.
   */
  blockNumber?: number
  /**
   * The timestamp of the event in UNIX format.
   */
  timestamp?: number
  /**
   * The decoded event data based on the given models.
   */
  decoded?:
    | FungibleTransfer
    | StablecoinTransfer
    | NftTransfer
    | MultitokenTransferSingle
    | MultitokenTransferBatch
    | UniswapTradeV2
    | UniswapTradeV3
  raw?: RawData
  /**
   * The transaction hash related to the event.
   */
  txHash?: string
  /**
   * The transaction index within the block.
   */
  txIndex?: number
  /**
   * The log index within the transaction.
   */
  logIndex?: number
}

export interface ApiGetBlockRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: ChainEnum
  /**
   * List of block numbers, separated by comma.
   */
  blockIds?: string
  /**
   * Range of block numbers. Both blockFrom and blockTo need to be specified.
   */
  blockFrom?: number
  /**
   * Range of block numbers. Both blockFrom and blockTo need to be specified.
   */
  blockTo?: number
  /**
   * Date range when blocks were processed. Both timeFrom and timeTo need to be specified.
   */
  timeFrom?: string
  /**
   * Date range when blocks were processed. Both timeFrom and timeTo need to be specified.
   */
  timeTo?: string
  /**
   * The number of items per page (default is 50).
   */
  pageSize?: number
  /**
   * The offset to obtain next page of the data.
   */
  offset?: number
}

export interface Block {
  /**
   * The block number in the blockchain.
   */
  blockNumber?: number
  /**
   * The timestamp when the block was created, in milliseconds since Unix epoch.
   */
  blockTimestamp?: number
  /**
   * The hash of the block.
   */
  hash?: string
  /**
   * The number of ingested events in the block.
   */
  eventIngestedSize?: number
  /**
   * The number of ingested NFTs in the block.
   */
  nftIngestedSize?: number
  /**
   * The array of transaction hashes included in the block.
   */
  txHashes?: Array<string>
}

export interface ApiLatestBlockRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: ChainEnum
}

export interface ApiTokensRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: Chain
  /**
   * The blockchain address of the token (NFT collection or any fungible token).
   */
  tokenAddress: string
  /**
   * The ID of a specific NFT token.
   */
  tokenId?: string
}

export interface ApiUtxoByAddress extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: ChainUtxoEnum
  /**
   * The blockchain address.
   */
  address: string
  /**
   * The total amount of transaction you want to send. Only UTXOs up to this amount will be returned, so you will not spend more than you need.
   */
  totalValue?: number
}

export interface ApiUtxoResponse {
  chain: ChainUtxoEnum
  /**
   * Address of the UTXO
   */
  address: string
  /**
   * Hash of the transaction this UTXO is present in
   */
  txHash: string
  /**
   * Index of the UTXO in the transaction
   */
  index: number
  /**
   * Value of the UTXO, in BTC, LTC or DOGE.
   */
  value: number
}

export interface ApiCreateTokenRequest extends DefaultParamsType {
  /**
   * The blockchain to work with.
   */
  chain: Chain
  /**
   * Type of the contract
   */
  contractType: 'fungible' | 'nft' | 'multitoken'
  /**
   * Address of the fungible token owner
   */
  owner: string
  /**
   * Optional. Address of the fungible token minter, it defaults to the owner address
   */
  minter?: string
  /**
   * Optional. Address of the fungible token pauser, it defaults to the owner address
   */
  pauser?: string
  /**
   * Name of fungible token
   */
  name: string
  /**
   * Symbol of fungible token
   */
  symbol: string
  /**
   * Initial supply of fungible token
   */
  initialSupply: string
  /**
   * Initial holder of fungible token
   */
  initialHolder: string
  /**
   * Optional. Number of decimal places for the fungible token, it defaults to 18
   */
  decimals?: string
}
