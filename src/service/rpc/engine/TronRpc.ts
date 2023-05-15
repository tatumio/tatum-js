/* eslint-disable @typescript-eslint/no-explicit-any */

import {AbstractJsonRpc} from "./AbstractJsonRpc";
import {Container, Service} from "typedi";
import {CONFIG, Utils} from "../../../util";
import {
  AccountIdentifier,
  AccountPermissionUpdateOptions,
  BlockIdentifier,
  CreateAssetIssueOptions,
  CreateTransactionOptions,
  DetailOption,
  FreezeAccountOptions,
  GetCanWithdrawUnfreezeAmountOptions,
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
  VisibleOption
} from "../../../dto";
import {BigNumber} from "bignumber.js";
@Service({
  factory: (data: { id: string }) => {
    return new TronRpc(data.id)
  },
  transient: true,
})
export class TronRpc extends AbstractJsonRpc implements TronRpcSuite {
  _id: string
  constructor(id: string) {
    super(id, Container.of(id).get(CONFIG).network)
    this._id = id
  }

  getRpcNodeUrl(subPath?: string): string {
    const { apiKey, rpcUrl, network } = Container.of(this._id).get(CONFIG)
    if (apiKey) {
      const url =  rpcUrl || `https://api.tatum.io/v3/blockchain/node/${network}/${apiKey.v1 ? apiKey.v1 : apiKey.v2}`
      return url.concat(subPath || "")
    }
    return rpcUrl || `https://api.tatum.io/v3/blockchain/node/${network}/`.concat(subPath || "")
  }

  accountPermissionUpdate(ownerAddress: string, actives: TronPermission[], owner: TronPermission, options?: AccountPermissionUpdateOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/accountpermissionupdate"),
      body: Utils.convertObjCamelToSnake({ownerAddress, actives, owner, ...options})
    });
  }

  broadcastHex(transaction: string): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/broadcasthex"),
      body: Utils.convertObjCamelToSnake({transaction})
    });
  }

  broadcastTransaction(rawBody: TronTxRawBody): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/broadcasttransaction"),
      body: Utils.convertObjCamelToSnake(rawBody)
    });
  }

  clearAbi(ownerAddress: string, contractAddress: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/clearabi"),
      body: Utils.convertObjCamelToSnake({ownerAddress, contractAddress, ...options})
    });
  }

  createAccount(ownerAddress: string, accountAddress: string, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/createaccount"),
      body: {ownerAddress, accountAddress, ...options}
    });
  }

  createAssetIssue(ownerAddress: string, name: string, abbr: string, totalSupply: number, trxNum: number, num: number, startTime: number, endTime: number, url: string, options?: CreateAssetIssueOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/createassetissue"),
      body: {ownerAddress, name, abbr, totalSupply, trxNum, num, startTime, endTime, url, ...options}
    });
  }

  createTransaction(ownerAddress: string, toAddress: string, amount: BigNumber, options?: CreateTransactionOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/createtransaction"),
      body: Utils.convertObjCamelToSnake({ownerAddress, toAddress, amount, ...options})
    });
  }

  delegateResource(ownerAddress: string, receiverAddress: string, balance: BigNumber, resource: TronStakeType, lock: boolean, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/delegateresource"),
      body: Utils.convertObjCamelToSnake({ownerAddress, receiverAddress, balance, resource, lock, ...options})
    });
  }

  deployContract(abi: string, bytecode: string, feeLimit: BigNumber, parameter: string, originEnergyLimit: BigNumber, ownerAddress: string, name: string, callValue: BigNumber, consumeUserResourcePercent: number, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/deploycontract"),
      body: Utils.convertObjCamelToSnake({
        abi,
        bytecode,
        feeLimit,
        parameter,
        originEnergyLimit,
        ownerAddress,
        name,
        callValue,
        consumeUserResourcePercent, ...options
      })
    });
  }

  estimateEnergy(ownerAddress: string, contractAddress: string, functionSelector: string, parameter: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/estimateenergy"),
      body: Utils.convertObjCamelToSnake({ownerAddress, contractAddress, functionSelector, parameter, ...options})
    });
  }

  freezeBalance(ownerAddress: string, frozenBalance: BigNumber, frozenDuration: number, resource: TronStakeType, options?: FreezeAccountOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/freezebalance"),
      body: Utils.convertObjCamelToSnake({ownerAddress, frozenBalance, frozenDuration, resource, ...options})
    });
  }

  freezeBalanceV2(ownerAddress: string, frozenBalance: BigNumber, resource: TronStakeType, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/freezebalancev2"),
      body: Utils.convertObjCamelToSnake({ownerAddress, frozenBalance, resource, ...options})
    });
  }

  getAccount(address: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getaccount"),
      body: Utils.convertObjCamelToSnake({address, ...options})
    });
  }

  getAccountBalance(accountIdentifier: AccountIdentifier, blockIdentifier: BlockIdentifier, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getaccountbalance"),
      body: Utils.convertObjCamelToSnake({accountIdentifier, blockIdentifier, ...options})
    });
  }

  getAccountNet(address: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getaccountnet"),
      body: Utils.convertObjCamelToSnake({address, ...options})
    });
  }

  getAccountResources(address: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getaccountresource"),
      body: Utils.convertObjCamelToSnake({address, ...options})
    });
  }

  getAssetIssueByAccount(address: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getassetissuebyaccount"),
      body: Utils.convertObjCamelToSnake({address, ...options})
    });
  }

  getAssetIssueById(value: number): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getassetissuebyid"),
      body: Utils.convertObjCamelToSnake({value})
    });
  }

  getAssetIssueByName(name: string): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getassetissuebyname"),
      body: Utils.convertObjCamelToSnake({name})
    });
  }

  getAssetIssueList(): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getassetissuelist"),
    })
  }

  getAssetIssueListByName(value: string): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getassetissuelistbyname"),
      body: Utils.convertObjCamelToSnake({value})
    });
  }

  getAvailableUnfreezeCount(ownerAddress: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getavailableunfreezecount"),
      body: Utils.convertObjCamelToSnake({ownerAddress, ...options})
    });
  }

  getBandwidthPrices(): Promise<TronPrices> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getbandwidthprices"),
    });
  }

  getBlock(idOrNum: string, options?: DetailOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getblock"),
      body: Utils.convertObjCamelToSnake({idOrNum, ...options})
    });
  }

  getBlockBalance(hash: string, number: BigNumber, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getblockbalance"),
      body: Utils.convertObjCamelToSnake({hash, number, ...options})
    });
  }

  getBlockById(id: string): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getblockbyid"),
      body: Utils.convertObjCamelToSnake({id})
    });
  }

  getBlockByLatestNum(num: number): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getblockbylatestnum"),
      body: Utils.convertObjCamelToSnake({num})
    });
  }

  getBlockByLimitNext(startNum: number, endNum: number): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getblockbylimitnext"),
      body: Utils.convertObjCamelToSnake({startNum, endNum})
    });
  }

  getBlockByNum(num: number): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getblockbynum"),
      body: Utils.convertObjCamelToSnake({num})
    });
  }

  getBurnTRX(): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getburntrx"),
    });
  }

  getCanDelegatedMaxSize(ownerAddress: string, type: TronStakeTypeNumeric, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getcandelegatedmaxsize"),
      body: Utils.convertObjCamelToSnake({ownerAddress, type, ...options})
    });
  }

  getCanWithdrawUnfreezeAmount(ownerAddress: string, options?: GetCanWithdrawUnfreezeAmountOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getcanwithdrawunfreezeamount"),
      body: Utils.convertObjCamelToSnake({ownerAddress, ...options})
    });
  }

  getChainParameters(): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getchainparameters"),
    });
  }

  getContract(value: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getcontract"),
      body: Utils.convertObjCamelToSnake({value, ...options})
    });
  }

  getContractInfo(value: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getcontractinfo"),
      body: Utils.convertObjCamelToSnake({value, ...options})
    });
  }

  getDelegatedResource(fromAddress: string, toAddress: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getdelegatedresource"),
      body: Utils.convertObjCamelToSnake({fromAddress, toAddress, ...options})
    });
  }

  getDelegatedResourceAccountIndex(value: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getdelegatedresourceaccountindex"),
      body: Utils.convertObjCamelToSnake({value, ...options})
    });
  }

  getDelegatedResourceAccountIndexV2(value: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getdelegatedresourceaccountindexv2"),
      body: Utils.convertObjCamelToSnake({value, ...options})
    });
  }

  getDelegatedResourceV2(fromAddress: string, toAddress: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getdelegatedresourcev2"),
      body: Utils.convertObjCamelToSnake({fromAddress, toAddress, ...options})
    });
  }

  getEnergyPrices(): Promise<TronPrices> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getenergyprices"),
    });
  }

  getNodeInfo(): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getnodeinfo"),
    });
  }

  getNowBlock(): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getnowblock"),
    });
  }

  getPaginatedAssetIssueList(offset: number, limit: number): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/getpaginatedassetissuelist"),
      body: Utils.convertObjCamelToSnake({offset, limit})
    });
  }

  getTransactionById(value: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/gettransactionbyid"),
      body: Utils.convertObjCamelToSnake({value, ...options})
    });
  }

  getTransactionInfoByBlockNum(num: number): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/gettransactioninfobyblocknum"),
      body: Utils.convertObjCamelToSnake({num})
    });
  }

  getTransactionInfoById(value: string): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/gettransactioninfobyid"),
      body: Utils.convertObjCamelToSnake({value})
    });
  }

  listNodes(): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/listnodes"),
    });
  }

  participateAssetIssue(toAddress: string, ownerAddress: string, assetName: string, amount: BigNumber, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/participateassetissue"),
      body: Utils.convertObjCamelToSnake({toAddress, ownerAddress, assetName, amount, ...options})
    });
  }

  transferAsset(ownerAddress: string, toAddress: string, assetName: string, amount: BigNumber, options?: TransferAssetIssueByAccountOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/transferasset"),
      body: Utils.convertObjCamelToSnake({ownerAddress, toAddress, assetName, amount, ...options})
    });
  }

  triggerConstantContract(ownerAddress: string, contractAddress: string, functionSelector: string, parameter: string, options?: TriggerConstantContractOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/triggerconstantcontract"),
      body: Utils.convertObjCamelToSnake({ownerAddress, contractAddress, functionSelector, parameter, ...options})
    });
  }

  triggerSmartContract(ownerAddress: string, contractAddress: string, functionSelector: string, parameter: string, options?: TriggerSmartContractOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/triggersmartcontract"),
      body: Utils.convertObjCamelToSnake({ownerAddress, contractAddress, functionSelector, parameter, ...options})
    });
  }

  unDelegateResource(ownerAddress: string, receiverAddress: string, balance: BigNumber, resource: TronStakeType, lock: boolean, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/undelegateresource"),
      body: Utils.convertObjCamelToSnake({ownerAddress, receiverAddress, balance, resource, lock, ...options})
    });
  }

  unfreezeAsset(ownerAddress: string, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/unfreezeasset"),
      body: Utils.convertObjCamelToSnake({ownerAddress, ...options})
    });
  }

  unfreezeBalance(ownerAddress: string, resource: TronStakeType, options?: UnFreezeAccountOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/unfreezebalance"),
      body: Utils.convertObjCamelToSnake({ownerAddress, resource, ...options})
    });
  }

  unfreezeBalanceV2(ownerAddress: string, unfreezeBalance: BigNumber, resource: TronStakeType, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/unfreezebalancev2"),
      body: Utils.convertObjCamelToSnake({ownerAddress, unfreezeBalance, resource, ...options})
    });
  }

  updateAccount(ownerAddress: string, accountName: string, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/updateaccount"),
      body: Utils.convertObjCamelToSnake({ownerAddress, accountName, ...options})
    });
  }

  updateAsset(ownerAddress: string, url: string, options?: UpdateAssetOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/updateasset"),
      body: Utils.convertObjCamelToSnake({ownerAddress, url, ...options})
    });
  }

  updateEnergyLimit(ownerAddress: string, contractAddress: string, originEnergyLimit: number, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/updateenergylimit"),
      body: Utils.convertObjCamelToSnake({ownerAddress, contractAddress, originEnergyLimit, ...options})
    });
  }

  updateSetting(ownerAddress: string, contractAddress: string, consumeUserResourcePercent: number, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/updatesetting"),
      body: Utils.convertObjCamelToSnake({ownerAddress, contractAddress, consumeUserResourcePercent, ...options})
    });
  }

  validateAddress(address: string, options?: VisibleOption): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/validateaddress"),
      body: Utils.convertObjCamelToSnake({address, ...options})
    });
  }

  withdrawExpireUnfreeze(ownerAddress: string, options?: VisibleAndPermissionIdOptions): Promise<any> {
    return this.connector.post({
      path: this.getRpcNodeUrl("/wallet/withdrawexpireunfreeze"),
      body: Utils.convertObjCamelToSnake({ownerAddress, ...options})
    });
  }
}
