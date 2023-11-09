/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { JsonRpcResponse } from '../JsonRpcResponse.dto'
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
  blockNumber(): Promise<JsonRpcResponse<BigNumber>>

  call(callObject: TxPayload, blockNumber?: BlockNumber): Promise<JsonRpcResponse<string>>

  chainId(): Promise<JsonRpcResponse<BigNumber>>

  estimateGas(callObject: TxPayload): Promise<JsonRpcResponse<BigNumber>>

  gasPrice(): Promise<JsonRpcResponse<BigNumber>>

  maxPriorityFeePerGas(): Promise<JsonRpcResponse<BigNumber>>

  getBalance(address: string, blockNumber?: BlockNumber): Promise<JsonRpcResponse<BigNumber>>

  getBlockByHash(blockHash: string, includeTransactions?: boolean): Promise<JsonRpcResponse<any>>
  getBlockTransactionCountByHash(blockHash: string): Promise<JsonRpcResponse<number>>

  getBlockByNumber(blockNumber: string | number, includeTransactions?: boolean): Promise<JsonRpcResponse<any>>

  getBlockTransactionCountByNumber(blockNumber: string | number): Promise<JsonRpcResponse<number>>

  getCode(address: string, blockNumber?: BlockNumber): Promise<JsonRpcResponse<string>>

  getLogs(filterObject: LogFilter): Promise<JsonRpcResponse<any>>

  getProof(address: string, storageKeys: string[], blockNumber?: BlockNumber): Promise<JsonRpcResponse<any>>

  getStorageAt(address: string, position: string, blockNumber?: BlockNumber): Promise<JsonRpcResponse<string>>

  getTransactionByBlockHashAndIndex(blockHash: string, index: number): Promise<JsonRpcResponse<any>>

  getTransactionByBlockNumberAndIndex(
    blockNumber: string | number,
    index: number,
  ): Promise<JsonRpcResponse<any>>

  getTransactionByHash(txHash: string): Promise<JsonRpcResponse<any>>

  getTransactionCount(address: string, blockNumber?: BlockNumber): Promise<JsonRpcResponse<BigNumber>>

  getTransactionReceipt(txHash: string): Promise<JsonRpcResponse<any>>

  getBlockReceipts(blockNumber: string | number): Promise<JsonRpcResponse<any>>

  getUncleByBlockHashAndIndex(blockHash: string, index: number): Promise<JsonRpcResponse<any>>

  getUncleByBlockNumberAndIndex(blockNumber: string | number, index: number): Promise<JsonRpcResponse<any>>

  getUncleCountByBlockHash(blockHash: string): Promise<JsonRpcResponse<string>>

  getUncleCountByBlockNumber(blockNumber: string | number): Promise<JsonRpcResponse<string>>

  protocolVersion(): Promise<JsonRpcResponse<string>>

  sendRawTransaction(signedTransactionData: string): Promise<JsonRpcResponse<string>>

  syncing(): Promise<JsonRpcResponse<any>>

  // Custom helper functions, not part of the RPC node

  getTokenDecimals(tokenAddress: string): Promise<JsonRpcResponse<BigNumber>>

  getTokenSymbol(tokenAddress: string): Promise<JsonRpcResponse<string>>

  getTokenName(tokenAddress: string): Promise<JsonRpcResponse<string>>

  getTokenCap(tokenAddress: string): Promise<JsonRpcResponse<BigNumber>>

  getTokenTotalSupply(tokenAddress: string): Promise<JsonRpcResponse<BigNumber>>

  supportsInterfaceERC1155(tokenAddress: string): Promise<JsonRpcResponse<boolean>>

  getContractAddress(txHash: string): Promise<string | null>

  // web3_ methods
  clientVersion(): Promise<JsonRpcResponse<string>>

  sha3(data: string): Promise<JsonRpcResponse<string>>

  // debug_ methods
  debugGetBadBlocks(): Promise<JsonRpcResponse<any>>

  debugStorageRangeAt(
    blockHash: string,
    txIndex: number,
    contractAddress: string,
    startKey: string,
    maxResult: number,
  ): Promise<JsonRpcResponse<any>>

  debugTraceCall(
    callObject: TxPayload,
    blockNumber: BlockNumber,
    traceOptions?: TraceOptions,
  ): Promise<JsonRpcResponse<any>>

  debugTraceTransaction(txHash: string, traceOptions?: TraceOptions): Promise<JsonRpcResponse<any>>

  /**
   *
   * @param rplBlock The RLP encoded block
   * @param traceOptions The tracer object
   */
  debugTraceBlock(rplBlock: string, traceOptions?: TraceOptions): Promise<JsonRpcResponse<any>>

  debugTraceBlockByHash(blockHash: string, traceOptions?: TraceOptions): Promise<JsonRpcResponse<any>>

  debugTraceBlockByNumber(
    blockHash: string | number,
    traceOptions?: TraceOptions,
  ): Promise<JsonRpcResponse<any>>

  // trace_ methods
  traceBlock(blockNumber: BlockNumber): Promise<JsonRpcResponse<any>>

  traceCall(
    callObject: TxPayload,
    traceType: TraceType[],
    blockNumber: BlockNumber,
  ): Promise<JsonRpcResponse<any>>

  traceCallMany(
    callObject: TxPayload[],
    traceType: TraceType[][],
    blockNumber: BlockNumber,
  ): Promise<JsonRpcResponse<any>>

  traceRawTransaction(signedTransactionData: string, traceOptions: TraceType[]): Promise<JsonRpcResponse<any>>

  traceReplayBlockTransactions(
    blockNumber: BlockNumber,
    traceOptions: TraceType[],
  ): Promise<JsonRpcResponse<any>>

  traceReplayTransaction(txHash: string, traceOptions: TraceType[]): Promise<JsonRpcResponse<any>>

  traceTransaction(txHash: string): Promise<JsonRpcResponse<any>>

  // txpool_ methods
  txPoolContent(): Promise<JsonRpcResponse<any>>

  txPoolStatus(): Promise<JsonRpcResponse<any>>

  txPoolInspect(): Promise<JsonRpcResponse<any>>
}

export interface EvmBeaconResponse<T> {
  data: T
  execution_optimistic?: boolean
  finalized?: boolean
}

export type StateId = 'head' | 'genesis' | 'finalized' | 'justified' | string
export type BlockId = 'head' | 'genesis' | 'finalized' | string

export interface BlockQuery {
  blockId: BlockId
}

export interface StateCommitteesQuery {
  stateId: StateId
  epoch?: string
  index?: string
  slot?: string
}

export interface StateQuery {
  stateId: StateId
}

export interface StateSyncCommitteesQuery extends StateQuery {
  epoch?: string
}

export interface ValidatorBalancesQuery extends StateQuery {
  id?: string[] // Array of either hex encoded public key or validator index
}

export type ValidatorStatus =
  | 'pending_initialized'
  | 'pending_queued'
  | 'active_ongoing'
  | 'active_exiting'
  | 'active_slashed'
  | 'exited_unslashed'
  | 'exited_slashed'
  | 'withdrawal_possible'
  | 'withdrawal_done'
  | 'active'
  | 'pending'
  | 'exited'
  | 'withdrawal'

export interface ValidatorsQuery extends StateQuery {
  id?: string[] // Array of either hex encoded public key or validator index
  status?: ValidatorStatus[]
}

export interface ValidatorQuery extends StateQuery {
  validatorId: string // Either a hex encoded public key or validator index
}

export interface EvmBeaconV1Interface {
  getGenesis(): Promise<EvmBeaconResponse<any>>
  getBlockHeaders(query?: { slot?: string; parentRoot?: string }): Promise<EvmBeaconResponse<any>>
  getBlockHeader(query: BlockQuery): Promise<EvmBeaconResponse<any>>
  getBlockRoot(query: BlockQuery): Promise<EvmBeaconResponse<any>>
  getBlockAttestations(query: BlockQuery): Promise<EvmBeaconResponse<any>>
  getStateCommittees(query: StateCommitteesQuery): Promise<EvmBeaconResponse<any>>
  getStateFinalityCheckpoints(query: StateQuery): Promise<EvmBeaconResponse<any>>
  getStateFork(query: StateQuery): Promise<EvmBeaconResponse<any>>
  getStateRoot(query: StateQuery): Promise<EvmBeaconResponse<any>>
  getStateSyncCommittees(query: StateSyncCommitteesQuery): Promise<EvmBeaconResponse<any>>
  getStateValidatorBalances(query: ValidatorBalancesQuery): Promise<EvmBeaconResponse<any>>
  getStateValidators(query: ValidatorsQuery): Promise<EvmBeaconResponse<any>>
  getStateValidator(query: ValidatorQuery): Promise<EvmBeaconResponse<any>>
}

export interface EvmBasedBeaconRpcSuite extends EvmBasedRpcInterface, AbstractRpcInterface {
  beacon: {
    v1: EvmBeaconV1Interface
  }
}
