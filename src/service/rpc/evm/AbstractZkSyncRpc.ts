/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { Service } from 'typedi'
import {
  JsonRpcResponse, TxPayload,
} from '../../../dto'
import { Logger } from '../../../service/logger/logger.types'
import { AbstractEvmRpc } from './AbstractEvmRpc'
import {
  GetProofParams,
  GetProofResponse,
  TokenDetails,
  TokenMapping,
  ZksGetL2ToL1MsgProofParams,
  ZksGetL2ToL1ProofResponse,
  ZkSyncRpcInterface,
} from '../../../dto/rpc/ZkSyncRpcSuite'
import { EvmUtils } from './EvmUtils'

@Service()
export abstract class AbstractZkSyncRpc extends AbstractEvmRpc implements ZkSyncRpcInterface {
  protected abstract logger: Logger
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  async zksEstimateFee(payload: TxPayload): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_estimateFee', [payload])
  }

  async zksEstimateGasL1ToL2(payload: TxPayload): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('zks_estimateGasL1ToL2', [payload])
    return EvmUtils.toBigNumber(response)
  }

  async zksGetBridgeHubContract(): Promise<JsonRpcResponse<string>> {
    const response = await this.rpcCall<JsonRpcResponse<string>>('zks_getBridgeHubContract')
    return EvmUtils.toDecodedString(response)
  }

  async zksGetMinContract(): Promise<JsonRpcResponse<string>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('zks_getMinContract')
    return EvmUtils.toDecodedString(response)
  }

  async zksGetBridgeContracts(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_getBridgeContracts')
  }

  async zksL1ChainId(): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('zks_l1ChainId')
    return EvmUtils.toBigNumber(response)
  }

  async zksGetBaseTokenL1Address(): Promise<JsonRpcResponse<string>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('zks_getBaseTokenL1Address')
    return EvmUtils.toDecodedString(response)
  }

  async zksGetConfirmedTokens():  Promise<JsonRpcResponse<TokenDetails[]>> {
    return this.rpcCall<JsonRpcResponse<TokenDetails[]>>('zks_getConfirmedTokens')
  }

  async zksGetAllAccountBalances(address: string): Promise<JsonRpcResponse<TokenMapping>> {
    return this.rpcCall<JsonRpcResponse<TokenMapping>>('zks_getAllAccountBalances', [address])
  }

  async zksGetL2ToL1MsgProof(params: ZksGetL2ToL1MsgProofParams): Promise<JsonRpcResponse<ZksGetL2ToL1ProofResponse>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_getL2ToL1MsgProof', [params])
  }

  async zksGetL2ToL1LogProof(txHash: string, logIndex?: number): Promise<JsonRpcResponse<ZksGetL2ToL1ProofResponse>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_getL2ToL1LogProof', [txHash, logIndex])
  }

  async zksL1BatchNumber(): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('zks_l1BatchNumber')
    return EvmUtils.toBigNumber(response)
  }

  async zksGetBlockDetails(blockNumber: number): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_getBlockDetails', [blockNumber])
  }

  async zksGetTransactionDetails(txHash: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_getTransactionDetails', [txHash])
  }

  async zksGetRawBlockTransactions(blockNumber: number): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_getRawBlockTransactions', [blockNumber])
  }

  async zksGetL1BatchDetails(batchNumber: number): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_getL1BatchDetails', [batchNumber])
  }

  async zksGetBytecodeByHash(txHash: string): Promise<JsonRpcResponse<number[]>> {
    return this.rpcCall<JsonRpcResponse<number[]>>('zks_getBytecodeByHash', [txHash])
  }

  async zksGetL1BatchBlockRange(batchNumber: number): Promise<JsonRpcResponse<string[]>> {
    return this.rpcCall<JsonRpcResponse<string[]>>('zks_getL1BatchBlockRange', [batchNumber])
  }

  async zksGetL1GasPrice(): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('zks_getL1GasPrice')
    return EvmUtils.toBigNumber(response)
  }

  async zksGetFeeParams(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_getFeeParams')
  }

  async zksGetProtocolVersion(versionId?: number): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_getProtocolVersion',  versionId ? [versionId] : [])
  }

  async zksGetProof(params: GetProofParams): Promise<JsonRpcResponse<GetProofResponse>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_getProof', [params])
  }

  async zksSendRawTransactionWithDetailedOutput(data: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('zks_sendRawTransactionWithDetailedOutput', [data])
  }
}
