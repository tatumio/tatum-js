/* eslint-disable @typescript-eslint/no-explicit-any */

import { RPCSimulateOperationParam } from './tezos.types'

export interface GetBlockHashes extends GetChainId {
  length?: number
  head?: string
  minDate?: string
}

export interface GetContract extends GetContractBase {
  normalizeTypes?: string
}

export interface GetChainId {
  chainId: string
}

export interface GetBlock extends GetChainId {
  block: string
}

export interface GetContractBase extends GetBlock {
  contractId: string
}

export interface GetContractsBigMapGet extends GetContractBase {
  key: any
  type: any
}

export interface GetContractsEntrypoints extends GetContract {
  entrypoint: string
}

export interface GetBlockHash extends GetBlock {
  hash: string
}

export interface SimulateOperation extends RPCSimulateOperationParam, GetBlock {
}

export interface GetInvalidBlocks extends GetChainId {
  blockHash: string
}

export interface GetProtocol {
  protocolHash: string
}

export interface InjectBase {
  async?: string
  chain?: string
}

export interface InjectOperation extends InjectBase {
  operationBytes: string
}

export interface InjectBlock extends InjectBase {
 force?: string
 data: string
  operations: { branch: string, data: string }[][]
}

export interface InjectProtocol {
  expectedEnvVersion: number
  components: {
    name: string
    interface: string
    implementation: string
  }[]
  async?: string
}

export interface TezosRpcInterface {
  getBlocksHead(params: GetChainId): Promise<any>

  getBlockHashes(params: GetBlockHashes): Promise<any>

  getContracts(params: GetContract): Promise<any>

  getContractsTickets(params: GetContractBase): Promise<any>

  getContractsBalance(params: GetContractBase): Promise<any>

  getContractsBalanceAndFrozenBonds(params: GetContractBase): Promise<any>

  getContractsBigMapGet(params: GetContractsBigMapGet): Promise<any>

  getContractsCounter(params: GetContractBase): Promise<any>

  getContractDelegate(params: GetContractBase): Promise<any>

  getContractsEntrypoints(params: GetContract): Promise<any>

  getContractsEntrypoint(params: GetContractsEntrypoints): Promise<any>

  getContractsManagerKey(params: GetContractBase): Promise<any>

  getBlock(params: GetBlock): Promise<any>

  getBlockHash(params: GetBlockHash): Promise<any>

  getOperationHashes(params: GetBlock): Promise<any>

  getOperations(params: GetBlock): Promise<any>

  getBlockShell(params: GetBlock): Promise<any>

  getBlockHeader(params: GetBlock): Promise<any>

  simulateOperation(params: SimulateOperation): Promise<any>

  getChainId(params: GetChainId): Promise<any>

  getCheckpoint(params: GetChainId): Promise<any>

  getInvalidBlocks(params: GetInvalidBlocks): Promise<any>

  isBootstrapped(params: GetChainId): Promise<any>

  getLevelsCheckpoint(params: GetChainId): Promise<any>

  getLevelsCaboose(params: GetChainId): Promise<any>

  getLevelsSavePoint(params: GetChainId): Promise<any>

  getErrorsSchema(): Promise<any>

  getNodeVersion(): Promise<any>

  getProtocol(params: GetProtocol): Promise<any>

  getConfig(): Promise<any>

  getHistoryMode(): Promise<any>

  getNetworkDal(): Promise<any>

  getUserActivatedProtocolOverrides(): Promise<any>

  getUserActivatedUpgrades(): Promise<any>

  injectOperation(params: InjectOperation): Promise<string>

  injectBlock(params: InjectBlock): Promise<string>

  injectProtocol(params: InjectProtocol): Promise<string>
}
