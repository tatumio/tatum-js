/* eslint-disable @typescript-eslint/no-explicit-any */

import { EvmBasedRpcInterface, TxPayload } from './EvmBasedRpcInterface'
import { JsonRpcResponse } from '../JsonRpcResponse.dto'
import { BigNumber } from 'bignumber.js'
import { AbstractRpcInterface } from './AbstractJsonRpcInterface'

export interface BridgeContracts {
  l1Erc20DefaultBridge: string
  l2Erc20DefaultBridge: string
  l1WethBridge: string
  l2WethBridge: string
}

export interface TokenDetails {
  l1Address: string
  l2Address: string
  name: string
  symbol: string
  decimals: number
}

export interface TokenMapping {
  [key: string]: string
}

export interface ZksGetL2ToL1MsgProofParams {
  block: number
  sender: string
  msg: string
  l2_log_position?: string
}

export interface ZksGetL2ToL1ProofResponse {
  id: string
  proof: string[]
  root: string
}

export interface GetProofParams {
  data: string
  arrayOfData: string[]
  timePoint: number
}

export interface StorageProof {
  key: string;
  value: string;
  index: number;
  proof: string[];
}

export interface GetProofResponse {
  address: string;
  storageProof: StorageProof[];
}

export interface ZkSyncRpcSuite extends ZkSyncRpcInterface, AbstractRpcInterface {}

export interface ZkSyncRpcInterface extends EvmBasedRpcInterface {
  zksEstimateFee(payload: TxPayload): Promise<JsonRpcResponse<any>>
  zksEstimateGasL1ToL2(payload: TxPayload): Promise<JsonRpcResponse<BigNumber>>
  zksGetBridgeHubContract(): Promise<JsonRpcResponse<string>>
  zksGetMinContract(): Promise<JsonRpcResponse<string>>
  zksGetBridgeContracts(): Promise<JsonRpcResponse<BridgeContracts>>
  zksL1ChainId(): Promise<JsonRpcResponse<BigNumber>>
  zksGetBaseTokenL1Address(): Promise<JsonRpcResponse<string>>
  zksGetConfirmedTokens(tokenIdToStart: number, maxTokens: number): Promise<JsonRpcResponse<TokenDetails[]>>
  zksGetAllAccountBalances(address: string): Promise<JsonRpcResponse<TokenMapping>>
  zksGetL2ToL1MsgProof(payload: ZksGetL2ToL1MsgProofParams): Promise<JsonRpcResponse<ZksGetL2ToL1ProofResponse>>
  zksGetL2ToL1LogProof(txHash: string, logIndex?: number): Promise<JsonRpcResponse<ZksGetL2ToL1ProofResponse>>
  zksL1BatchNumber(): Promise<JsonRpcResponse<BigNumber>>
  zksGetBlockDetails(blockNumber: number): Promise<JsonRpcResponse<any>>
  zksGetTransactionDetails(txHash: string): Promise<JsonRpcResponse<any>>
  zksGetRawBlockTransactions(blockNumber: number): Promise<JsonRpcResponse<any>>
  zksGetL1BatchDetails(batchNumber: number): Promise<JsonRpcResponse<any>>
  zksGetBytecodeByHash(txHash: string): Promise<JsonRpcResponse<number[]>>
  zksGetL1BatchBlockRange(batchNumber: number): Promise<JsonRpcResponse<string[]>>
  zksGetL1GasPrice(): Promise<JsonRpcResponse<BigNumber>>
  zksGetFeeParams(): Promise<JsonRpcResponse<any>>
  zksGetProtocolVersion(versionId?: number): Promise<JsonRpcResponse<any>>
  zksGetProof(payload: GetProofParams): Promise<JsonRpcResponse<GetProofResponse>>
  zksSendRawTransactionWithDetailedOutput(data: string): Promise<JsonRpcResponse<any>>
}
