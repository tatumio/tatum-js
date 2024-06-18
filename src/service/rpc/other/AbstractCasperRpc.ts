/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AccountPutDeployResponse,
  BlockIdentifier,
  CasperRpcSuite,
  ChainGetBlockResponse,
  ChainGetBlockTransfersResponse,
  ChainGetEraSummaryResponse,
  ChainGetStateRootHashResponse,
  InfoGetChainspecResponse,
  InfoGetDeployRequest,
  InfoGetDeployResponse, InfoGetStatusResponse,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryGlobalStateRequest,
  QueryGlobalStateResponse,
  SpeculativeExecRequest,
  StateGetAccountInfoRequest,
  StateGetAccountInfoResponse,
  StateGetDictionaryItemRequest,
  StateGetDictionaryItemResponse,
} from '../../../dto/rpc/CasperRpcSuite'
import { JsonRpcResponse } from '../../../dto'

export abstract class AbstractCasperRpc implements CasperRpcSuite {
  protected abstract rpcCall<T>(method: string, params?: unknown[] | unknown): Promise<T>
  private getBlockIdentifier(block_identifier: BlockIdentifier) {
    if (typeof block_identifier === 'number') {
      return { Height: block_identifier }
    } else {
      return { Hash: block_identifier }
    }
  }
  async accountPutDeploy(deploy: any): Promise<JsonRpcResponse<AccountPutDeployResponse>> {
    return this.rpcCall<JsonRpcResponse<AccountPutDeployResponse>>('account_put_deploy', [deploy])
  }

  async speculativeExec(params: SpeculativeExecRequest): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('speculative_exec', params)
  }

  async chainGetBlock(block_identifier:BlockIdentifier): Promise<JsonRpcResponse<ChainGetBlockResponse>> {
    return this.rpcCall<JsonRpcResponse<any>>('chain_get_block', [this.getBlockIdentifier(block_identifier)])
  }

  async chainGetBlockTransfers(block_identifier: BlockIdentifier): Promise<JsonRpcResponse<ChainGetBlockTransfersResponse>> {
    return this.rpcCall<JsonRpcResponse<ChainGetBlockTransfersResponse>>('chain_get_block_transfers', [this.getBlockIdentifier(block_identifier)]);
  }

  async chainGetEraSummary(block_identifier?: BlockIdentifier): Promise<JsonRpcResponse<ChainGetEraSummaryResponse>> {
    const paramsRequest = block_identifier ? [this.getBlockIdentifier(block_identifier)] : []
    return this.rpcCall<JsonRpcResponse<ChainGetEraSummaryResponse>>('chain_get_era_summary', paramsRequest);
  }

  async chainGetStateRootHash(block_identifier?: BlockIdentifier): Promise<JsonRpcResponse<ChainGetStateRootHashResponse>> {
    const paramsRequest = block_identifier ? [this.getBlockIdentifier(block_identifier)] : []
    return this.rpcCall<JsonRpcResponse<ChainGetStateRootHashResponse>>('chain_get_state_root_hash', paramsRequest);
  }

  async infoGetChainspec(): Promise<JsonRpcResponse<InfoGetChainspecResponse>> {
    return this.rpcCall<JsonRpcResponse<InfoGetChainspecResponse>>('info_get_chainspec', []);
  }

  async infoGetDeploy(params: InfoGetDeployRequest): Promise<JsonRpcResponse<InfoGetDeployResponse>> {
    const paramsRequest: unknown[] = [params.deploy_hash];
    if (params.finalized_approvals !== undefined) {
      paramsRequest.push(params.finalized_approvals);
    }
    return this.rpcCall<JsonRpcResponse<InfoGetDeployResponse>>('info_get_deploy', paramsRequest);
  }

  async queryBalance(params: QueryBalanceRequest): Promise<JsonRpcResponse<QueryBalanceResponse>> {
    const paramsRequest = [
      { name: "state_identifier", value: params.state_identifier },
      { name: "purse_identifier", value: params.purse_identifier },
    ];
    return this.rpcCall<JsonRpcResponse<QueryBalanceResponse>>('query_balance', paramsRequest);
  }

  async queryGlobalState(params: QueryGlobalStateRequest): Promise<JsonRpcResponse<QueryGlobalStateResponse>> {
    const paramsRequest = [
      { name: "state_identifier", value: params.state_identifier },
      { name: "key", value: params.key },
      { name: "path", value: params.path }
    ];
    return this.rpcCall<JsonRpcResponse<QueryGlobalStateResponse>>('query_global_state', paramsRequest);
  }

  async stateGetAccountInfo(params: StateGetAccountInfoRequest): Promise<JsonRpcResponse<StateGetAccountInfoResponse>> {
    const paramsRequest = [{ Hash: params.block_identifier }, params.public_key];
    return this.rpcCall<JsonRpcResponse<StateGetAccountInfoResponse>>('state_get_account_info', paramsRequest);
  }

  async stateGetDictionaryItem(params: StateGetDictionaryItemRequest): Promise<JsonRpcResponse<StateGetDictionaryItemResponse>> {
    const paramsRequest = [params.dictionary_identifier, params.state_root_hash];
    return this.rpcCall<JsonRpcResponse<StateGetDictionaryItemResponse>>('state_get_dictionary_item', paramsRequest);
  }

  async infoGetStatus(): Promise<JsonRpcResponse<InfoGetStatusResponse>> {
    return this.rpcCall<JsonRpcResponse<InfoGetStatusResponse>>('info_get_status', []);
  }
}

