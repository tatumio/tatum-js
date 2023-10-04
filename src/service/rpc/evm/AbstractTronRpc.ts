/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { Service } from 'typedi'
import {
  AccountIdentifier,
  AccountPermissionUpdateOptions,
  BlockIdentifier,
  CreateAssetIssueOptions,
  CreateTransactionOptions,
  DeployContractOptions,
  DetailOption,
  FreezeAccountOptions,
  GetCanWithdrawUnfreezeAmountOptions,
  JsonRpcCall,
  JsonRpcResponse,
  TransferAssetIssueByAccountOptions,
  TriggerConstantContractOptions,
  TriggerSmartContractOptions,
  TronPermission,
  TronPrices,
  TronRpcSuite,
  TronStakeType,
  TronStakeTypeNumeric,
  TronTxRawBody,
  UnFreezeAccountOptions,
  UpdateAssetOptions,
  VisibleAndPermissionIdOptions,
  VisibleOption,
} from '../../../dto'
import { PostI } from '../../../dto/PostI'
import { Utils } from '../../../util'
import { AbstractEvmRpc } from './AbstractEvmRpc'

@Service()
export abstract class AbstractTronRpc extends AbstractEvmRpc implements TronRpcSuite {
  protected abstract post<T>(post: PostI): Promise<T>
  abstract destroy(): void
  abstract getRpcNodeUrl(): string

  abstract rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>>

  abstract rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>>

  private sendPost<T>({
    path,
    body,
    notConvertCamelToSnake,
  }: {
    path: string
    body?: any
    notConvertCamelToSnake?: boolean
  }): Promise<T> {
    const post: PostI = {
      path,
    }

    if (body) {
      post.body = notConvertCamelToSnake ? body : Utils.convertObjCamelToSnake(body)
    }

    return this.post(post)
  }

  accountPermissionUpdate(
    ownerAddress: string,
    actives: TronPermission[],
    owner: TronPermission,
    options?: AccountPermissionUpdateOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/accountpermissionupdate',
      body: { ownerAddress, actives, owner, ...options },
    })
  }

  broadcastHex(transaction: string): Promise<any> {
    return this.sendPost({
      path: '/wallet/broadcasthex',
      body: { transaction },
    })
  }

  broadcastTransaction(rawBody: TronTxRawBody): Promise<any> {
    return this.sendPost({
      path: '/wallet/broadcasttransaction',
      body: rawBody,
      notConvertCamelToSnake: true,
    })
  }

  clearAbi(ownerAddress: string, contractAddress: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/clearabi',
      body: { ownerAddress, contractAddress, ...options },
    })
  }

  createAccount(
    ownerAddress: string,
    accountAddress: string,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/createaccount',
      body: { ownerAddress, accountAddress, ...options },
      notConvertCamelToSnake: true,
    })
  }

  createAssetIssue(
    ownerAddress: string,
    name: string,
    abbr: string,
    totalSupply: number,
    trxNum: number,
    num: number,
    startTime: number,
    endTime: number,
    url: string,
    options?: CreateAssetIssueOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/createassetissue',
      body: { ownerAddress, name, abbr, totalSupply, trxNum, num, startTime, endTime, url, ...options },
      notConvertCamelToSnake: true,
    })
  }

  createTransaction(
    ownerAddress: string,
    toAddress: string,
    amount: BigNumber,
    options?: CreateTransactionOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/createtransaction',
      body: { ownerAddress, toAddress, amount, ...options },
    })
  }

  delegateResource(
    ownerAddress: string,
    receiverAddress: string,
    balance: BigNumber,
    resource: TronStakeType,
    lock: boolean,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/delegateresource',
      body: {
        ownerAddress,
        receiverAddress,
        balance,
        resource,
        lock,
        ...options,
      },
    })
  }

  deployContract(
    abi: string,
    bytecode: string,
    ownerAddress: string,
    name: string,
    options?: DeployContractOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/deploycontract',
      body: {
        abi,
        bytecode,
        ownerAddress,
        name,
        ...options,
      },
    })
  }

  estimateEnergy(
    ownerAddress: string,
    contractAddress: string,
    functionSelector: string,
    parameter: string,
    options?: VisibleOption,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/estimateenergy',
      body: {
        ownerAddress,
        contractAddress,
        functionSelector,
        parameter,
        ...options,
      },
    })
  }

  freezeBalance(
    ownerAddress: string,
    frozenBalance: BigNumber,
    frozenDuration: number,
    resource: TronStakeType,
    options?: FreezeAccountOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/freezebalance',
      body: {
        ownerAddress,
        frozenBalance,
        frozenDuration,
        resource,
        ...options,
      },
    })
  }

  freezeBalanceV2(
    ownerAddress: string,
    frozenBalance: BigNumber,
    resource: TronStakeType,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/freezebalancev2',
      body: { ownerAddress, frozenBalance, resource, ...options },
    })
  }

  getAccount(address: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getaccount',
      body: { address, ...options },
    })
  }

  getAccountBalance(
    accountIdentifier: AccountIdentifier,
    blockIdentifier: BlockIdentifier,
    options?: VisibleOption,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/getaccountbalance',
      body: { accountIdentifier, blockIdentifier, ...options },
    })
  }

  getAccountNet(address: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getaccountnet',
      body: { address, ...options },
    })
  }

  getAccountResources(address: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getaccountresource',
      body: { address, ...options },
    })
  }

  getAssetIssueByAccount(address: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getassetissuebyaccount',
      body: { address, ...options },
    })
  }

  getAssetIssueById(value: number): Promise<any> {
    return this.sendPost({
      path: '/wallet/getassetissuebyid',
      body: { value },
    })
  }

  getAssetIssueByName(value: string): Promise<any> {
    return this.sendPost({
      path: '/wallet/getassetissuebyname',
      body: { value },
    })
  }

  getAssetIssueList(): Promise<any> {
    return this.sendPost({
      path: '/wallet/getassetissuelist',
    })
  }

  getAssetIssueListByName(value: string): Promise<any> {
    return this.sendPost({
      path: '/wallet/getassetissuelistbyname',
      body: Utils.convertObjCamelToSnake({ value }),
    })
  }

  getAvailableUnfreezeCount(ownerAddress: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getavailableunfreezecount',
      body: Utils.convertObjCamelToSnake({ ownerAddress, ...options }),
    })
  }

  getBandwidthPrices(): Promise<TronPrices> {
    return this.sendPost({
      path: '/wallet/getbandwidthprices',
    })
  }

  getBlock(idOrNum: string, options?: DetailOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getblock',
      body: { idOrNum, ...options },
    })
  }

  getBlockBalance(hash: string, number: BigNumber, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getblockbalance',
      body: { hash, number, ...options },
    })
  }

  getBlockById(id: string): Promise<any> {
    return this.sendPost({
      path: '/wallet/getblockbyid',
      body: { value: id },
    })
  }

  getBlockByLatestNum(num: number): Promise<any> {
    return this.sendPost({
      path: '/wallet/getblockbylatestnum',
      body: { num },
    })
  }

  getBlockByLimitNext(startNum: number, endNum: number): Promise<any> {
    return this.sendPost({
      path: '/wallet/getblockbylimitnext',
      body: { startNum, endNum },
      notConvertCamelToSnake: true,
    })
  }

  getBlockByNum(num: number): Promise<any> {
    return this.sendPost({
      path: '/wallet/getblockbynum',
      body: { num },
    })
  }

  getBurnTRX(): Promise<any> {
    return this.sendPost({
      path: '/wallet/getburntrx',
    })
  }

  getCanDelegatedMaxSize(
    ownerAddress: string,
    type: TronStakeTypeNumeric,
    options?: VisibleOption,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/getcandelegatedmaxsize',
      body: { ownerAddress, type, ...options },
    })
  }

  getCanWithdrawUnfreezeAmount(
    ownerAddress: string,
    options?: GetCanWithdrawUnfreezeAmountOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/getcanwithdrawunfreezeamount',
      body: { ownerAddress, ...options },
    })
  }

  getChainParameters(): Promise<any> {
    return this.sendPost({
      path: '/wallet/getchainparameters',
    })
  }

  getContract(value: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getcontract',
      body: { value, ...options },
    })
  }

  getContractInfo(value: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getcontractinfo',
      body: { value, ...options },
    })
  }

  getDelegatedResource(fromAddress: string, toAddress: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getdelegatedresource',
      body: { fromAddress, toAddress, ...options },
    })
  }

  getDelegatedResourceAccountIndex(value: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getdelegatedresourceaccountindex',
      body: { value, ...options },
    })
  }

  getDelegatedResourceAccountIndexV2(value: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getdelegatedresourceaccountindexv2',
      body: { value, ...options },
    })
  }

  getDelegatedResourceV2(fromAddress: string, toAddress: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/getdelegatedresourcev2',
      body: { fromAddress, toAddress, ...options },
    })
  }

  getEnergyPrices(): Promise<TronPrices> {
    return this.sendPost({
      path: '/wallet/getenergyprices',
    })
  }

  getNodeInfo(): Promise<any> {
    return this.sendPost({
      path: '/wallet/getnodeinfo',
    })
  }

  getNowBlock(): Promise<any> {
    return this.sendPost({
      path: '/wallet/getnowblock',
    })
  }

  getPaginatedAssetIssueList(offset: number, limit: number): Promise<any> {
    return this.sendPost({
      path: '/wallet/getpaginatedassetissuelist',
      body: { offset, limit },
    })
  }

  getTransactionById(value: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/gettransactionbyid',
      body: { value, ...options },
    })
  }

  getTransactionInfoByBlockNum(num: number): Promise<any> {
    return this.sendPost({
      path: '/wallet/gettransactioninfobyblocknum',
      body: { num },
    })
  }

  getTransactionInfoById(value: string): Promise<any> {
    return this.sendPost({
      path: '/wallet/gettransactioninfobyid',
      body: { value },
    })
  }

  listNodes(): Promise<any> {
    return this.sendPost({
      path: '/wallet/listnodes',
    })
  }

  participateAssetIssue(
    toAddress: string,
    ownerAddress: string,
    assetName: string,
    amount: BigNumber,
    options?: VisibleOption,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/participateassetissue',
      body: { toAddress, ownerAddress, assetName, amount, ...options },
    })
  }

  transferAsset(
    ownerAddress: string,
    toAddress: string,
    assetName: string,
    amount: BigNumber,
    options?: TransferAssetIssueByAccountOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/transferasset',
      body: { ownerAddress, toAddress, assetName, amount, ...options },
    })
  }

  triggerConstantContract(
    ownerAddress: string,
    contractAddress: string,
    functionSelector: string,
    parameter: string,
    options?: TriggerConstantContractOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/triggerconstantcontract',
      body: {
        ownerAddress,
        contractAddress,
        functionSelector,
        parameter,
        ...options,
      },
    })
  }

  triggerSmartContract(
    ownerAddress: string,
    contractAddress: string,
    functionSelector: string,
    parameter: string,
    options?: TriggerSmartContractOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/triggersmartcontract',
      body: {
        ownerAddress,
        contractAddress,
        functionSelector,
        parameter,
        ...options,
      },
    })
  }

  unDelegateResource(
    ownerAddress: string,
    receiverAddress: string,
    balance: BigNumber,
    resource: TronStakeType,
    lock: boolean,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/undelegateresource',
      body: {
        ownerAddress,
        receiverAddress,
        balance,
        resource,
        lock,
        ...options,
      },
    })
  }

  unfreezeAsset(ownerAddress: string, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.sendPost({
      path: '/wallet/unfreezeasset',
      body: { ownerAddress, ...options },
    })
  }

  unfreezeBalance(
    ownerAddress: string,
    resource: TronStakeType,
    options?: UnFreezeAccountOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/unfreezebalance',
      body: { ownerAddress, resource, ...options },
    })
  }

  unfreezeBalanceV2(
    ownerAddress: string,
    unfreezeBalance: BigNumber,
    resource: TronStakeType,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/unfreezebalancev2',
      body: { ownerAddress, unfreezeBalance, resource, ...options },
    })
  }

  updateAccount(
    ownerAddress: string,
    accountName: string,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/updateaccount',
      body: { ownerAddress, accountName, ...options },
    })
  }

  updateAsset(ownerAddress: string, url: string, options?: UpdateAssetOptions): Promise<any> {
    return this.sendPost({
      path: '/wallet/updateasset',
      body: { ownerAddress, url, ...options },
    })
  }

  updateEnergyLimit(
    ownerAddress: string,
    contractAddress: string,
    originEnergyLimit: number,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/updateenergylimit',
      body: { ownerAddress, contractAddress, originEnergyLimit, ...options },
    })
  }

  updateSetting(
    ownerAddress: string,
    contractAddress: string,
    consumeUserResourcePercent: number,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/updatesetting',
      body: {
        ownerAddress,
        contractAddress,
        consumeUserResourcePercent,
        ...options,
      },
    })
  }

  validateAddress(address: string, options?: VisibleOption): Promise<any> {
    return this.sendPost({
      path: '/wallet/validateaddress',
      body: { address, ...options },
    })
  }

  withdrawExpireUnfreeze(ownerAddress: string, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.sendPost({
      path: '/wallet/withdrawexpireunfreeze',
      body: { ownerAddress, ...options },
    })
  }
}
