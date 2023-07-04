/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { ResponseDto } from '../../util'
import { AbstractRpcInterface } from './AbstractJsonRpcInterface'

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
  to?: string

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

export interface EvmBasedRpcSuite extends EvmBasedRpcInterface, AbstractRpcInterface {}

export interface EvmBasedRpcInterface {
  // eth_ methods
  blockNumber(): Promise<ResponseDto<BigNumber>>

  call(callObject: TxPayload, blockNumber?: BlockNumber): Promise<ResponseDto<string>>

  chainId(): Promise<ResponseDto<BigNumber>>

  estimateGas(callObject: TxPayload): Promise<ResponseDto<BigNumber>>

  gasPrice(): Promise<ResponseDto<BigNumber>>

  maxPriorityFeePerGas(): Promise<ResponseDto<BigNumber>>

  getBalance(address: string, blockNumber?: BlockNumber): Promise<ResponseDto<BigNumber>>

  getBlockByHash(blockHash: string, includeTransactions?: boolean): Promise<ResponseDto<any>>
  getBlockTransactionCountByHash(blockHash: string): Promise<ResponseDto<number>>

  getBlockByNumber(blockNumber: string | number, includeTransactions?: boolean): Promise<ResponseDto<any>>

  getBlockTransactionCountByNumber(blockNumber: string | number): Promise<ResponseDto<number>>

  getCode(address: string, blockNumber?: BlockNumber): Promise<ResponseDto<string>>

  getLogs(filterObject: LogFilter): Promise<ResponseDto<any>>

  getProof(address: string, storageKeys: string[], blockNumber?: BlockNumber): Promise<ResponseDto<any>>

  getStorageAt(address: string, position: string, blockNumber?: BlockNumber): Promise<ResponseDto<string>>

  getTransactionByBlockHashAndIndex(blockHash: string, index: number): Promise<ResponseDto<any>>

  getTransactionByBlockNumberAndIndex(blockNumber: string | number, index: number): Promise<ResponseDto<any>>

  getTransactionByHash(txHash: string): Promise<ResponseDto<any>>

  getTransactionCount(address: string, blockNumber?: BlockNumber): Promise<ResponseDto<BigNumber>>

  getTransactionReceipt(txHash: string): Promise<ResponseDto<any>>

  getUncleByBlockHashAndIndex(blockHash: string, index: number): Promise<ResponseDto<any>>

  getUncleByBlockNumberAndIndex(blockNumber: string | number, index: number): Promise<ResponseDto<any>>

  getUncleCountByBlockHash(blockHash: string): Promise<ResponseDto<string>>

  getUncleCountByBlockNumber(blockNumber: string | number): Promise<ResponseDto<string>>

  protocolVersion(): Promise<ResponseDto<string>>

  sendRawTransaction(signedTransactionData: string): Promise<ResponseDto<string>>

  syncing(): Promise<ResponseDto<any>>

  // Custom helper functions, not part of the RPC node

  getTokenDecimals(tokenAddress: string): Promise<ResponseDto<BigNumber>>

  getContractAddress(txHash: string): Promise<ResponseDto<string | null>>

  // web3_ methods
  clientVersion(): Promise<ResponseDto<string>>

  sha3(data: string): Promise<ResponseDto<string>>

  // debug_ methods
  debugGetBadBlocks(): Promise<ResponseDto<any>>

  debugStorageRangeAt(
    blockHash: string,
    txIndex: number,
    contractAddress: string,
    startKey: string,
    maxResult: string,
  ): Promise<ResponseDto<any>>

  debugTraceCall(
    callObject: TxPayload,
    blockNumber: BlockNumber,
    traceOptions?: TraceOptions,
  ): Promise<ResponseDto<any>>

  debugTraceTransaction(txHash: string, traceOptions?: TraceOptions): Promise<ResponseDto<any>>

  debugTraceBlockByHash(blockHash: string, traceOptions?: TraceOptions): Promise<ResponseDto<any>>

  debugTraceBlockByNumber(blockHash: string | number, traceOptions?: TraceOptions): Promise<ResponseDto<any>>

  // trace_ methods
  traceBlock(blockNumber: BlockNumber): Promise<ResponseDto<any>>

  traceCall(
    callObject: TxPayload,
    traceType: TraceType[],
    blockNumber: BlockNumber,
  ): Promise<ResponseDto<any>>

  traceCallMany(
    callObject: TxPayload[],
    traceType: TraceType[][],
    blockNumber: BlockNumber,
  ): Promise<ResponseDto<any>>

  traceRawTransaction(signedTransactionData: string, traceOptions: TraceType[]): Promise<ResponseDto<any>>

  traceReplayBlockTransactions(blockNumber: BlockNumber, traceOptions: TraceType[]): Promise<ResponseDto<any>>

  traceReplayTransaction(txHash: string, traceOptions: TraceType[]): Promise<ResponseDto<any>>

  traceTransaction(txHash: string): Promise<ResponseDto<any>>

  // txpool_ methods
  txPoolContent(): Promise<ResponseDto<any>>

  txPoolStatus(): Promise<ResponseDto<any>>

  txPoolInspect(): Promise<ResponseDto<any>>
}
