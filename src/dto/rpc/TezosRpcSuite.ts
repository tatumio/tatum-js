/* eslint-disable @typescript-eslint/no-explicit-any */

import { PreapplyParams, RPCSimulateOperationParam } from './tezos.types'

export interface GetBlockHashes extends GetChainId {
  length?: number
  head?: string
  minDate?: string
}

export interface GetContract extends GetContractBase {
  normalizeTypes?: boolean
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

export interface GetContractBigMapValue extends GetContractBase {
  key: any
  type: any
}

export interface GetContractsEntrypoints extends GetContract {
  entrypoint: string
}

export interface SimulateOperation extends RPCSimulateOperationParam, GetBlock {}

export interface PreapplyOperations extends GetBlock {
  operations: PreapplyParams
}

export interface GetInvalidBlocks extends GetChainId {
  blockHash: string
}

export interface GetProtocol extends GetBlock {
  protocolHash: string
}

export interface InjectBase {
  async?: boolean
  chain?: string
}

export interface InjectOperation extends InjectBase {
  operationBytes: string
}

export interface InjectBlock extends InjectBase {
  force?: boolean
  data: string
  operations: { branch: string; data: string }[][]
}

export interface InjectProtocol {
  expectedEnvVersion: number
  components: {
    name: string
    interface: string
    implementation: string
  }[]
  async?: boolean
}

export interface TezosRpcInterface {
  getProtocols(params: GetBlock): Promise<any>

  getManagerKey(address: string, params: GetBlock): Promise<any>

  getConstants(params: GetBlock): Promise<any>

  getBlocksHead(params: GetChainId): Promise<any>

  getBlockHashes(params: GetBlockHashes): Promise<any>

  getContract(params: GetContract): Promise<any>

  getContractTickets(params: GetContractBase): Promise<any>

  getContractBalance(params: GetContractBase): Promise<any>

  getContractBalanceAndFrozenBonds(params: GetContractBase): Promise<any>

  getContractBigMapValue(params: GetContractBigMapValue): Promise<any>

  getContractCounter(params: GetContractBase): Promise<any>

  getContractDelegate(params: GetContractBase): Promise<any>

  getContractEntrypoints(params: GetContract): Promise<any>

  getContractEntrypoint(params: GetContractsEntrypoints): Promise<any>

  getContractManagerKey(params: GetContractBase): Promise<any>

  getContracts(params: GetBlock): Promise<any>

  getBlock(params: GetBlock): Promise<any>

  getBlockHash(params: GetBlock): Promise<any>

  getOperationHashes(params: GetBlock): Promise<any>

  getOperations(params: GetBlock): Promise<any>

  getBlockShell(params: GetBlock): Promise<any>

  getBlockHeader(params: GetBlock): Promise<any>

  simulateOperation(params: SimulateOperation): Promise<any>

  preapplyOperations(params: PreapplyOperations): Promise<any>

  getChainId(params: GetChainId): Promise<any>

  getCheckpoint(params: GetChainId): Promise<any>

  getInvalidBlocks(params: GetInvalidBlocks): Promise<any>

  isBootstrapped(params: GetChainId): Promise<any>

  getLevelsCheckpoint(params: GetChainId): Promise<any>

  getLevelsCaboose(params: GetChainId): Promise<any>

  getLevelsSavepoint(params: GetChainId): Promise<any>

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
