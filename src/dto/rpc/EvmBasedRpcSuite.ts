/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from 'bignumber.js'
import { AbstractJsonRpcSuite } from './AbstractJsonRpcSuite'

/**
 * EVM based RPC calls.
 */

export type BlockNumber =
  | 'latest'
  | 'earliest'
  | 'pending'
  | 'safe'
  | 'finalized'
  | string
  | BigNumber
  | number

export interface TraceOptions {
  tracer: 'callTracer' | 'prestateTracer' | 'rawTracer' | 'vmTracer' | string
  tracerConfig: {
    // When set to true, this will only trace the primary (top-level) call and not any sub-calls. It eliminates the additional processing for each call frame
    onlyTopCall: boolean

    // A string of decimal integers that overrides the JavaScript-based tracing calls default timeout of 5 seconds.
    timeout: string
  }
}

export interface TxPayload {
  //  - The string of the address to the transaction is directed to
  to: string

  //  - (optional) The string of the address the transaction is sent from
  from?: string

  //  - (optional) The integer of the gas provided for the transaction execution
  gas?: string

  //  - (optional) The integer of the gasPrice used for each paid gas encoded as hexadecimal
  gasPrice?: string

  //  - (optional) The integer of the value sent with this transaction encoded as hexadecimal
  value?: string

  // The string of the hash of the method signature and encoded parameters, see the Ethereum Contract ABI
  data?: string
}

export type TraceType = 'vmTrace' | 'stateDiff' | 'trace'

export interface LogFilter {
  // - (optional, default: "latest") The block number as a string in hexadecimal format or tags. The supported tag values include earliest for the earliest/genesis block, latest for the latest mined block, pending for the pending state/transactions, safe for the most recent secure block, and finalized for the most recent secure block accepted by more than 2/3 of validators. safe and finalized are only supported on Ethereum, Gnosis, Arbitrum, Arbitrum Nova, and Avalanche C-chain
  fromBlock?: string

  // - (optional, default: "latest") The block number as a string in hexadecimal format or tags. The supported tag values include earliest for the earliest/genesis block, latest for the latest mined block, pending for the pending state/transactions, safe for the most recent secure block, and finalized for the most recent secure block accepted by more than 2/3 of validators. safe and finalized are only supported on Ethereum, Gnosis, Arbitrum, Arbitrum Nova, and Avalanche C-chain
  toBlock?: string

  // - (optional) The contract address or a list of addresses from which logs should originate
  address?: string

  // - (optional) An array of DATA topics and also, the topics are order-dependent. Visit this official page to learn more about topics
  topics?: string[]

  // - (optional) With the addition of EIP-234, blockHash is a new filter option that restricts the logs returned to the block number referenced in the blockHash. Using the blockHash field is equivalent to setting the fromBlock and toBlock to the block number the blockHash references. If blockHash is present in the filter criteria, neither fromBlock nor toBlock is allowed
  blockHash?: string
}

export interface EvmBasedRpcSuite extends AbstractJsonRpcSuite {
  // eth_ methods
  blockNumber(): Promise<BigNumber>

  call(callObject: TxPayload, blockNumber?: BlockNumber): Promise<string>

  chainId(): Promise<BigNumber>

  estimateGas(callObject: TxPayload): Promise<BigNumber>

  gasPrice(): Promise<BigNumber>

  maxPriorityFeePerGas(): Promise<BigNumber>

  getBalance(address: string, blockNumber?: BlockNumber): Promise<BigNumber>

  getBlockByHash(blockHash: string, includeTransactions?: boolean): Promise<any>

  getBlockByNumber(blockNumber: string | number, includeTransactions?: boolean): Promise<any>

  getCode(address: string, blockNumber?: BlockNumber): Promise<string>

  getLogs(filterObject: LogFilter): Promise<any>

  getStorageAt(address: string, position: string, blockNumber?: BlockNumber): Promise<string>

  getTransactionByBlockHashAndIndex(blockHash: string, index: number): Promise<any>

  getTransactionByBlockNumberAndIndex(blockNumber: string | number, index: number): Promise<any>

  getTransactionByHash(txHash: string): Promise<any>

  getTransactionCount(address: string, blockNumber?: BlockNumber): Promise<BigNumber>

  getTransactionReceipt(txHash: string): Promise<any>

  getUncleByBlockHashAndIndex(blockHash: string, index: number): Promise<any>

  getUncleByBlockNumberAndIndex(blockNumber: string | number, index: number): Promise<any>

  getUncleCountByBlockHash(blockHash: string): Promise<string>

  getUncleCountByBlockNumber(blockNumber: string | number): Promise<string>

  protocolVersion(): Promise<string>

  sendRawTransaction(signedTransactionData: string): Promise<string>

  syncing(): Promise<any>

  // web3_ methods
  clientVersion(): Promise<string>

  sha3(data: string): Promise<string>

  // debug_ methods
  debugGetBadBlocks(): Promise<any>

  debugStorageRangeAt(
    blockHash: string,
    txIndex: number,
    contractAddress: string,
    startKey: string,
    maxResult: string,
  ): Promise<any>

  debugTraceCall(callObject: TxPayload, blockNumber: BlockNumber, traceOptions?: TraceOptions): Promise<any>

  debugTraceTransaction(txHash: string, traceOptions?: TraceOptions): Promise<any>

  debugTraceBlockByHash(blockHash: string, traceOptions?: TraceOptions): Promise<any>

  debugTraceBlockByNumber(blockHash: string | number, traceOptions?: TraceOptions): Promise<any>

  // trace_ methods
  traceBlock(blockNumber: BlockNumber): Promise<any>

  traceCall(callObject: TxPayload, traceType: TraceType[], blockNumber: BlockNumber): Promise<any>

  traceCallMany(callObject: TxPayload[], traceType: TraceType[], blockNumber: BlockNumber): Promise<any>

  traceRawTransaction(signedTransactionData: string, traceOptions: TraceOptions): Promise<any>

  traceReplayBlockTransactions(blockNumber: BlockNumber, traceOptions: TraceOptions): Promise<any>

  traceReplayTransaction(txHash: string, traceOptions: TraceOptions): Promise<any>

  traceTransaction(txHash: string, traceOptions: any): Promise<any>

  // txpool_ methods
  txPoolContent(): Promise<any>

  txPoolStatus(include: 'pending' | 'queued'): Promise<any>

  txPoolInspect(): Promise<any>
}

export type Ethereum = EvmBasedRpcSuite
export type ArbitrumNova = EvmBasedRpcSuite
export type ArbitrumOne = EvmBasedRpcSuite
export type Aurora = EvmBasedRpcSuite
export type AvalancheC = EvmBasedRpcSuite
export type BinanceSmartChain = EvmBasedRpcSuite
export type Celo = EvmBasedRpcSuite
export type Cronos = EvmBasedRpcSuite
export type EthereumClassic = EvmBasedRpcSuite
export type Fantom = EvmBasedRpcSuite
export type Gnosis = EvmBasedRpcSuite
export type HarmonyOne = EvmBasedRpcSuite
export type Klaytn = EvmBasedRpcSuite
export type Kucoin = EvmBasedRpcSuite
export type Oasis = EvmBasedRpcSuite
export type Optimism = EvmBasedRpcSuite
export type Palm = EvmBasedRpcSuite
export type Polygon = EvmBasedRpcSuite
export type Vechain = EvmBasedRpcSuite
export type Xdc = EvmBasedRpcSuite
