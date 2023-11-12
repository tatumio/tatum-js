/* eslint-disable @typescript-eslint/no-explicit-any */

import { Service } from 'typedi'
import {
  GetBlock,
  GetBlockHashes,
  GetChainId,
  GetContract,
  GetContractBase,
  GetContractBigMapValue,
  GetContractsEntrypoints,
  GetInvalidBlocks,
  GetProtocol,
  InjectBlock,
  InjectOperation,
  InjectProtocol,
  PreapplyOperations,
  QueryParams,
  SimulateOperation,
  TezosRpcInterface,
} from '../../../dto'
import { GetI } from '../../../dto/GetI'
import { PostI } from '../../../dto/PostI'
import { Utils } from '../../../util'

@Service()
export abstract class AbstractTezosRpc implements TezosRpcInterface {
  protected abstract get<T>(post: GetI): Promise<T>
  protected abstract post<T>(post: PostI): Promise<T>

  private async sendGet<T>({ path, queryParams }: { path: string; queryParams?: QueryParams }): Promise<T> {
    if (queryParams && Object.keys(queryParams).length > 0) {
      return this.get({ path: Utils.addQueryParams(path, Utils.camelToSnakeCase, queryParams) })
    }

    return this.get({ path })
  }

  private async sendPost<T>({
    path,
    body,
    queryParams,
  }: {
    path: string
    body?: any
    queryParams?: QueryParams
  }): Promise<T> {
    const post: PostI = {
      path,
    }

    if (queryParams && Object.keys(queryParams).length > 0) {
      post.path = Utils.addQueryParams(path, Utils.camelToSnakeCase, queryParams)
    }

    if (body) {
      if (typeof body === 'object') {
        post.body = Utils.convertObjCamelToSnake(body)
      } else {
        post.body = body
      }
    }

    return this.post(post)
  }

  getBlock(params: GetBlock): Promise<any> {
    const { chainId, block } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/${block}` })
  }

  getManagerKey(address: string, params: GetBlock): Promise<any> {
    const { chainId, block } = params
    return this.sendGet({
      path: `/chains/${chainId}/blocks/${block}/context/constants/${address}/manager_key`,
    })
  }

  getConstants(params: GetBlock): Promise<any> {
    const { chainId, block } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/${block}/context/constants` })
  }

  getBlockHash(params: GetBlock): Promise<any> {
    const { chainId, block } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/${block}/hash` })
  }

  getBlockHashes(params: GetBlockHashes): Promise<any> {
    const { chainId, ...rest } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks`, queryParams: rest })
  }

  getBlockHeader(params: GetBlock): Promise<any> {
    const { chainId, block } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/${block}/header` })
  }

  getBlockShell(params: GetBlock): Promise<any> {
    const { chainId, block } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/${block}/header/shell` })
  }

  getBlocksHead(params: GetChainId): Promise<any> {
    const { chainId } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/head` })
  }

  getChainId(params: GetChainId): Promise<any> {
    const { chainId } = params
    return this.sendGet({ path: `/chains/${chainId}/chain_id` })
  }

  getCheckpoint(params: GetChainId): Promise<any> {
    const { chainId } = params
    return this.sendGet({ path: `/chains/${chainId}/checkpoint` })
  }

  getConfig(): Promise<any> {
    return this.sendGet({ path: `/config/` })
  }

  getContractDelegate(params: GetContractBase): Promise<any> {
    const { chainId, block, contractId } = params
    return this.sendGet({
      path: `/chains/${chainId}/blocks/${block}/context/contracts/${contractId}/delegate`,
    })
  }

  getContract(params: GetContract): Promise<any> {
    const { chainId, contractId, block, ...rest } = params
    return this.sendGet({
      path: `/chains/${chainId}/blocks/${block}/context/contracts/${contractId}`,
      queryParams: rest,
    })
  }

  getContractBalance(params: GetContractBase): Promise<any> {
    const { chainId, block, contractId } = params
    return this.sendGet({
      path: `/chains/${chainId}/blocks/${block}/context/contracts/${contractId}/balance`,
    })
  }

  getContractBalanceAndFrozenBonds(params: GetContractBase): Promise<any> {
    const { chainId, block, contractId } = params
    return this.sendGet({
      path: `/chains/${chainId}/blocks/${block}/context/contracts/${contractId}/balance_and_frozen_bonds`,
    })
  }

  getContractBigMapValue(params: GetContractBigMapValue): Promise<any> {
    const { chainId, block, contractId, ...rest } = params
    return this.sendPost({
      path: `/chains/${chainId}/blocks/${block}/context/contracts/${contractId}/big_map_get`,
      body: rest,
    })
  }

  getContractCounter(params: GetContractBase): Promise<any> {
    const { chainId, block, contractId } = params
    return this.sendGet({
      path: `/chains/${chainId}/blocks/${block}/context/contracts/${contractId}/counter`,
    })
  }

  getContractEntrypoint(params: GetContractsEntrypoints): Promise<any> {
    const { chainId, block, contractId, entrypoint, ...rest } = params
    return this.sendGet({
      path: `/chains/${chainId}/blocks/${block}/context/contracts/${contractId}/entrypoints/${entrypoint}`,
      queryParams: rest,
    })
  }

  getContractEntrypoints(params: GetContract): Promise<any> {
    const { chainId, block, contractId, ...rest } = params
    return this.sendGet({
      path: `/chains/${chainId}/blocks/${block}/context/contracts/${contractId}/entrypoints`,
      queryParams: rest,
    })
  }

  getContractManagerKey(params: GetContractBase): Promise<any> {
    const { chainId, block, contractId } = params
    return this.sendGet({
      path: `/chains/${chainId}/blocks/${block}/context/contracts/${contractId}/manager_key`,
    })
  }

  getContractTickets(params: GetContractBase): Promise<any> {
    const { chainId, block, contractId } = params
    return this.sendGet({
      path: `/chains/${chainId}/blocks/${block}/context/contracts/${contractId}/all_ticket_balances`,
    })
  }

  getContracts(params: GetBlock): Promise<any> {
    const { chainId, block } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/${block}/context/contracts` })
  }

  getErrorsSchema(): Promise<any> {
    return this.sendGet({ path: `/errors/` })
  }

  getHistoryMode(): Promise<any> {
    return this.sendGet({ path: `/config/history_mode` })
  }

  getInvalidBlocks(params: GetInvalidBlocks): Promise<any> {
    const { chainId } = params
    return this.sendGet({ path: `/chains/${chainId}/invalid_blocks` })
  }

  getLevelsCaboose(params: GetChainId): Promise<any> {
    const { chainId } = params
    return this.sendGet({ path: `/chains/${chainId}/levels/caboose` })
  }

  getLevelsCheckpoint(params: GetChainId): Promise<any> {
    const { chainId } = params
    return this.sendGet({ path: `/chains/${chainId}/levels/checkpoint` })
  }

  getLevelsSavepoint(params: GetChainId): Promise<any> {
    const { chainId } = params
    return this.sendGet({ path: `/chains/${chainId}/levels/savepoint` })
  }

  getNetworkDal(): Promise<any> {
    return this.sendGet({ path: `/config/network/dal` })
  }

  getNodeVersion(): Promise<any> {
    return this.sendGet({ path: `/version/` })
  }

  getOperationHashes(params: GetBlock): Promise<any> {
    const { chainId, block } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/${block}/operations_hashes` })
  }

  getOperations(params: GetBlock): Promise<any> {
    const { chainId, block } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/${block}/operations_hashes` })
  }

  getProtocol(params: GetProtocol): Promise<any> {
    const { protocolHash, chainId, block } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/${block}/protocols/${protocolHash}` })
  }

  getProtocols(params: GetBlock): Promise<any> {
    const { chainId, block } = params
    return this.sendGet({ path: `/chains/${chainId}/blocks/${block}/protocols` })
  }

  getUserActivatedProtocolOverrides(): Promise<any> {
    return this.sendGet({ path: `/config/network/user_activated_protocol_overrides` })
  }

  getUserActivatedUpgrades(): Promise<any> {
    return this.sendGet({ path: `/config/network/user_activated_upgrades` })
  }

  isBootstrapped(params: GetChainId): Promise<any> {
    const { chainId } = params
    return this.sendGet({ path: `/chains/${chainId}/is_bootstrapped` })
  }

  simulateOperation(params: SimulateOperation): Promise<any> {
    const { chainId, block, ...rest } = params
    return this.sendPost({
      path: `/chains/${chainId}/blocks/${block}/helpers/scripts/simulate_operation`,
      body: rest,
    })
  }

  preapplyOperations(params: PreapplyOperations): Promise<any> {
    const { chainId, block, operations } = params
    return this.sendPost({
      path: `/chains/${chainId}/blocks/${block}/helpers/preapply/operations`,
      body: operations,
    })
  }

  injectOperation(params: InjectOperation): Promise<string> {
    const { operationBytes, ...rest } = params
    return this.sendPost({ path: `/injection/operation`, body: operationBytes, queryParams: rest })
  }

  injectBlock(params: InjectBlock): Promise<string> {
    const { data, operations, ...rest } = params
    return this.sendPost({ path: `/injection/block`, body: { data, operations }, queryParams: rest })
  }

  injectProtocol(params: InjectProtocol): Promise<string> {
    const { components, expectedEnvVersion, ...rest } = params
    return this.sendPost({
      path: `/injection/protocol`,
      body: { components, expectedEnvVersion },
      queryParams: rest,
    })
  }
}
