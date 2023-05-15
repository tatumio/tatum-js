/* eslint-disable @typescript-eslint/no-explicit-any */
import {AbstractJsonRpcSuite} from "./AbstractJsonRpcSuite"
import {BigNumber} from "bignumber.js";

export interface TronTxRawBody {
  visible?: boolean
  raw_data?: any
  raw_data_hex?: string
  signature?: string[]
  txId?: string
}

export interface TronPrices {
  prices: string
}

export enum TronStakeType {
  BANDWIDTH = 'BANDWIDTH',
  ENERGY = 'ENERGY'
}

export enum TronStakeTypeNumeric {
  BANDWIDTH = 0,
  ENERGY = 1
}

export interface TronPermission {
  type: number,
  permissionName: string,
  threshold: number,
  operations: string,
  keys: Array<{ address: string, weight: number }>
}

export interface VisibleOption {
  // Defaults to false. Whether addresses are in base58check format.
  visible?: boolean
}

export interface PermissionIdOption {
  // for multi-signature use
  permissionId?: number
}

export interface ExtraDataOption {
  //  totes on the transaction, HEX format
  extraData?: string
}

export interface CreateTransactionOptions extends VisibleOption, PermissionIdOption, ExtraDataOption {
}

export interface VisibleAndPermissionIdOptions extends VisibleOption, PermissionIdOption {
}

export interface AccountPermissionUpdateOptions extends VisibleOption {
  // witness permission
  witness?: TronPermission
}

export interface FreezeAccountOptions extends VisibleAndPermissionIdOptions {
  // the address that will receive the resource, default hexString
  receiverAddress?: string
}

export interface UnFreezeAccountOptions extends VisibleAndPermissionIdOptions {
  //  address that will lose the resource, default hexString
  receiverAddress?: string
}

export interface GetCanWithdrawUnfreezeAmountOptions extends VisibleOption {
  // query cutoff timestamp, in milliseconds.
  timestamp?: number
}

export interface DetailOption {
  // true means query the entire block information include the header and body. false means only query the block header information.
  detail?: boolean
}

export interface TransferAssetIssueByAccountOptions extends VisibleAndPermissionIdOptions, ExtraDataOption {
}

export interface CreateAssetIssueOptions extends VisibleOption {
  // Token free asset net limit
  freeAssetNetLimit?: BigNumber
  // Token public free asset net limit
  publicFreeAssetNetLimit?: BigNumber
  // Token frozen supply
  frozenSupply?: {
    frozen_amount: BigNumber,
    frozen_days: number
  }
  precision?: number
  description?: string
}

export interface UpdateAssetOptions extends VisibleAndPermissionIdOptions {
  description?: string
  // Each token holder's free bandwidth
  newLimit?: BigNumber
  // The total free bandwidth of the token
  newPublicLimit?: BigNumber
}

export interface TriggerSmartContractOptions extends VisibleAndPermissionIdOptions {
  // Maximum TRX consumption, measured in SUN (1 TRX = 1,000,000 SUN)
  feeLimit?: BigNumber
  // Amount of TRX transferred with this transaction, measured in SUN (1 TRX = 1,000,000 SUN)
  callValue?: BigNumber
}

export interface TriggerConstantContractOptions extends VisibleOption {
  // Amount of TRX transferred to the contract with this transaction, the unit is sun. This field may be used when estimating energy consumption.
  callValue?: BigNumber
}

export interface AccountIdentifier {
  address: string
}

export interface BlockIdentifier {
  hash: string,
  number: BigNumber
}

export interface TronRpcSuite extends AbstractJsonRpcSuite {
  // address utilities
  validateAddress(address: string, options?: VisibleOption): Promise<any>

  // transactions
  broadcastTransaction(rawBody: TronTxRawBody): Promise<any>

  broadcastHex(transaction: string): Promise<any>

  createTransaction(ownerAddress: string, toAddress: string, amount: BigNumber, options?: CreateTransactionOptions): Promise<any>

  // accounts
  createAccount(ownerAddress: string, accountAddress: string, options?: VisibleAndPermissionIdOptions): Promise<any>

  getAccount(address: string, options?: VisibleOption): Promise<any>

  updateAccount(ownerAddress: string, accountName: string, options?: VisibleAndPermissionIdOptions): Promise<any>

  accountPermissionUpdate(ownerAddress: string, actives: TronPermission[], owner: TronPermission, options?: AccountPermissionUpdateOptions): Promise<any>

  getAccountBalance(accountIdentifier: AccountIdentifier, blockIdentifier: BlockIdentifier, options?: VisibleOption): Promise<any>

  // account resources
  getAccountResources(address: string, options?: VisibleOption): Promise<any>

  getAccountNet(address: string, options?: VisibleOption): Promise<any>

  freezeBalance(ownerAddress: string, frozenBalance: BigNumber, frozenDuration: number, resource: TronStakeType, options?: FreezeAccountOptions): Promise<any>

  unfreezeBalance(ownerAddress: string, resource: TronStakeType, options?: UnFreezeAccountOptions): Promise<any>

  getDelegatedResource(fromAddress: string, toAddress: string, options?: VisibleOption): Promise<any>

  getDelegatedResourceAccountIndex(value: string, options?: VisibleOption): Promise<any>

  freezeBalanceV2(ownerAddress: string, frozenBalance: BigNumber, resource: TronStakeType, options?: VisibleAndPermissionIdOptions): Promise<any>

  unfreezeBalanceV2(ownerAddress: string, unfreezeBalance: BigNumber, resource: TronStakeType, options?: VisibleAndPermissionIdOptions): Promise<any>

  delegateResource(ownerAddress: string, receiverAddress: string, balance: BigNumber, resource: TronStakeType, lock: boolean, options?: VisibleAndPermissionIdOptions): Promise<any>

  unDelegateResource(ownerAddress: string, receiverAddress: string, balance: BigNumber, resource: TronStakeType, lock: boolean, options?: VisibleAndPermissionIdOptions): Promise<any>

  withdrawExpireUnfreeze(ownerAddress: string, options?: VisibleAndPermissionIdOptions): Promise<any>

  getAvailableUnfreezeCount(ownerAddress: string, options?: VisibleOption): Promise<any>

  getCanWithdrawUnfreezeAmount(ownerAddress: string, options?: GetCanWithdrawUnfreezeAmountOptions): Promise<any>

  getCanDelegatedMaxSize(ownerAddress: string, type: TronStakeTypeNumeric, options?: VisibleOption): Promise<any>

  getDelegatedResourceV2(fromAddress: string, toAddress: string, options?: VisibleOption): Promise<any>

  getDelegatedResourceAccountIndexV2(value: string, options?: VisibleOption): Promise<any>

  //query the network
  getBlock(idOrNum: string, options?: DetailOption): Promise<any>

  getBlockByNum(num: number): Promise<any>

  getBlockById(id: string): Promise<any>

  getBlockByLatestNum(num: number): Promise<any>

  getBlockByLimitNext(startNum: number, endNum: number): Promise<any>

  getNowBlock(): Promise<any>

  getTransactionById(value: string, options?: VisibleOption): Promise<any>

  getTransactionInfoById(value: string): Promise<any>

  getTransactionInfoByBlockNum(num: number): Promise<any>

  listNodes(): Promise<any>

  getNodeInfo(): Promise<any>

  getChainParameters(): Promise<any>

  getBlockBalance(hash: string, number: BigNumber, options?: VisibleOption): Promise<any>

  getEnergyPrices(): Promise<TronPrices>

  getBandwidthPrices(): Promise<TronPrices>

  getBurnTRX(): Promise<any>

  // TRC10
  getAssetIssueByAccount(address: string, options?: VisibleOption): Promise<any>

  getAssetIssueById(value: number): Promise<any>

  getAssetIssueByName(name: string): Promise<any>

  getAssetIssueList(): Promise<any>

  getAssetIssueListByName(value: string): Promise<any>

  getPaginatedAssetIssueList(offset: number, limit: number): Promise<any>

  transferAsset(ownerAddress: string, toAddress: string, assetName: string, amount: BigNumber, options?: TransferAssetIssueByAccountOptions): Promise<any>

  createAssetIssue(ownerAddress: string, name: string, abbr: string, totalSupply: number, trxNum: number, num: number, startTime: number, endTime: number, url: string, options?: CreateAssetIssueOptions): Promise<any>

  participateAssetIssue(toAddress: string, ownerAddress: string, assetName: string, amount: BigNumber, options?: VisibleOption): Promise<any>

  unfreezeAsset(ownerAddress: string, options?: VisibleAndPermissionIdOptions): Promise<any>

  updateAsset(ownerAddress: string, url: string, options?: UpdateAssetOptions): Promise<any>

  // Smart Contracts
  getContract(value: string, options?: VisibleOption): Promise<any>

  getContractInfo(value: string, options?: VisibleOption): Promise<any>

  triggerSmartContract(ownerAddress: string, contractAddress: string, functionSelector: string, parameter: string, options?: TriggerSmartContractOptions): Promise<any>

  triggerConstantContract(ownerAddress: string, contractAddress: string, functionSelector: string, parameter: string, options?: TriggerConstantContractOptions): Promise<any>

  deployContract(
    abi: string,
    bytecode: string,
    feeLimit: BigNumber,
    parameter: string,
    originEnergyLimit: BigNumber,
    ownerAddress: string,
    name: string,
    callValue: BigNumber,
    consumeUserResourcePercent: number,
    options?: VisibleAndPermissionIdOptions
  ): Promise<any>

  updateSetting(ownerAddress: string, contractAddress: string, consumeUserResourcePercent: number, options?: VisibleAndPermissionIdOptions): Promise<any>

  updateEnergyLimit(ownerAddress: string, contractAddress: string, originEnergyLimit: number, options?: VisibleAndPermissionIdOptions): Promise<any>

  clearAbi(ownerAddress: string, contractAddress: string, options?: VisibleOption): Promise<any>

  estimateEnergy(ownerAddress: string, contractAddress: string, functionSelector: string, parameter: string, options?: VisibleOption): Promise<any>
}
