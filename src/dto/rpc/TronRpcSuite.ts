/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { ResponseDto } from '../../util'
import { AbstractRpcInterface } from './AbstractJsonRpcInterface'

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
  ENERGY = 'ENERGY',
}

export enum TronStakeTypeNumeric {
  BANDWIDTH = 0,
  ENERGY = 1,
}

export interface TronPermission {
  type: number
  permissionName: string
  threshold: number
  operations: string
  keys: Array<{ address: string; weight: number }>
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

export interface CreateTransactionOptions extends VisibleOption, PermissionIdOption, ExtraDataOption {}

export interface VisibleAndPermissionIdOptions extends VisibleOption, PermissionIdOption {}

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

export interface TransferAssetIssueByAccountOptions extends VisibleAndPermissionIdOptions, ExtraDataOption {}

export interface CreateAssetIssueOptions extends VisibleOption {
  // Token free asset net limit
  freeAssetNetLimit?: BigNumber
  // Token public free asset net limit
  publicFreeAssetNetLimit?: BigNumber
  // Token frozen supply
  frozenSupply?: {
    frozen_amount: BigNumber
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

export interface DeployContractOptions extends VisibleAndPermissionIdOptions {
  feeLimit: BigNumber
  parameter: string
  originEnergyLimit: BigNumber
  callValue: BigNumber
  consumeUserResourcePercent: number
}
export interface AccountIdentifier {
  address: string
}

export interface BlockIdentifier {
  hash: string
  number: BigNumber
}

export interface TronRpcSuite extends AbstractRpcInterface {
  /**
   * Validates a Tron address.
   *
   * @param {string} address - The Tron address to be validated.
   * @param {VisibleOption} [options] - The options for validation.
   * @returns {Promise<any>} - Returns a Promise that resolves with validation result.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-address-utility-methods/validateaddress
   */
  validateAddress(address: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Broadcasts a raw Tron transaction.
   *
   * @param {TronTxRawBody} rawBody - The raw body of the transaction to be broadcasted.
   * @returns {Promise<any>} - Returns a Promise that resolves with the broadcast result.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-transaction-methods/broadcasttransaction
   */
  broadcastTransaction(rawBody: TronTxRawBody): Promise<ResponseDto<any>>

  /**
   * Broadcasts a transaction in hexadecimal format.
   *
   * @param {string} transaction - The transaction in hexadecimal format.
   * @returns {Promise<any>} - Returns a Promise that resolves with the broadcast result.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-transaction-methods/broadcasthex
   */
  broadcastHex(transaction: string): Promise<ResponseDto<any>>

  /**
   * Creates a Tron transaction.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} toAddress - The address of the recipient.
   * @param {BigNumber} amount - The amount to be transferred.
   * @param {CreateTransactionOptions} [options] - The options for creating transaction.
   * @returns {Promise<any>} - Returns a Promise that resolves with the created transaction.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-transaction-methods/createtransaction
   */
  createTransaction(
    ownerAddress: string,
    toAddress: string,
    amount: BigNumber,
    options?: CreateTransactionOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Creates a Tron account.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} accountAddress - The address of the account to be created.
   * @param {VisibleAndPermissionIdOptions} [options] - The options for creating an account.
   * @returns {Promise<any>} - Returns a Promise that resolves with the created account.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-methods/createaccount
   */
  createAccount(
    ownerAddress: string,
    accountAddress: string,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Gets the details of a specific account.
   *
   * @param {string} address - The address of the account.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the account details.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-methods/getaccount
   */
  getAccount(address: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Updates an existing Tron account.
   *
   * @param {string} ownerAddress - The address of the account owner.
   * @param {string} accountName - The new name for the account.
   * @param {VisibleAndPermissionIdOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves when the update is complete.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-methods/updateaccount
   */
  updateAccount(
    ownerAddress: string,
    accountName: string,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Updates the permissions of an account.
   *
   * @param {string} ownerAddress - The address of the account owner.
   * @param {TronPermission[]} actives - The new permissions.
   * @param {TronPermission} owner - The new owner.
   * @param {AccountPermissionUpdateOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves when the update is complete.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-methods/accountpermissionupdate
   */
  accountPermissionUpdate(
    ownerAddress: string,
    actives: TronPermission[],
    owner: TronPermission,
    options?: AccountPermissionUpdateOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Gets the balance of a specific account.
   *
   * @param {AccountIdentifier} accountIdentifier - The identifier of the account.
   * @param {BlockIdentifier} blockIdentifier - The identifier of the block.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the account balance.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-methods/getaccountbalance
   */
  getAccountBalance(
    accountIdentifier: AccountIdentifier,
    blockIdentifier: BlockIdentifier,
    options?: VisibleOption,
  ): Promise<ResponseDto<any>>

  /**
   * Fetches the resources of a given account.
   *
   * @param {string} address - The address of the account.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the account resources.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/getaccountresource
   */
  getAccountResources(address: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Fetches the net resources of a given account.
   *
   * @param {string} address - The address of the account.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the account net resources.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/getaccountnet
   */
  getAccountNet(address: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Freezes balance of a given account.
   *
   * @param {string} ownerAddress - The address of the account.
   * @param {BigNumber} frozenBalance - The balance to freeze.
   * @param {number} frozenDuration - Duration of the freeze.
   * @param {TronStakeType} resource - The resource to freeze.
   * @param {FreezeAccountOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves when the freeze is complete.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/freezebalance
   */
  freezeBalance(
    ownerAddress: string,
    frozenBalance: BigNumber,
    frozenDuration: number,
    resource: TronStakeType,
    options?: FreezeAccountOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Unfreezes the balance of a given account.
   *
   * @param {string} ownerAddress - The address of the account.
   * @param {TronStakeType} resource - The resource to unfreeze.
   * @param {UnFreezeAccountOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves when the unfreeze is complete.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/unfreezebalance
   */
  unfreezeBalance(
    ownerAddress: string,
    resource: TronStakeType,
    options?: UnFreezeAccountOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Fetches the delegated resource from a specified address to another.
   *
   * @param {string} fromAddress - The address of the sender.
   * @param {string} toAddress - The address of the receiver.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the delegated resources.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/getdelegatedresource
   */
  getDelegatedResource(
    fromAddress: string,
    toAddress: string,
    options?: VisibleOption,
  ): Promise<ResponseDto<any>>

  /**
   * Fetches the account index of the delegated resource.
   *
   * @param {string} value - The value of the delegated resource.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the account index of the delegated resource.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/getdelegatedresourceaccountindex
   */
  getDelegatedResourceAccountIndex(value: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Freezes the balance of a given account, version 2.
   *
   * @param {string} ownerAddress - The address of the account.
   * @param {BigNumber} frozenBalance - The balance to freeze.
   * @param {TronStakeType} resource - The resource to freeze.
   * @param {VisibleAndPermissionIdOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves when the freeze is complete.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/freezebalancev2
   */
  freezeBalanceV2(
    ownerAddress: string,
    frozenBalance: BigNumber,
    resource: TronStakeType,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Unfreezes the balance of a given account, version 2.
   *
   * @param {string} ownerAddress - The address of the account.
   * @param {BigNumber} unfreezeBalance - The balance to unfreeze.
   * @param {TronStakeType} resource - The resource to unfreeze.
   * @param {VisibleAndPermissionIdOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves when the unfreeze is complete.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/unfreezebalancev2
   */
  unfreezeBalanceV2(
    ownerAddress: string,
    unfreezeBalance: BigNumber,
    resource: TronStakeType,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Delegates a resource from one account to another.
   *
   * @param {string} ownerAddress - The address of the account delegating the resource.
   * @param {string} receiverAddress - The address of the account receiving the resource.
   * @param {BigNumber} balance - The balance to delegate.
   * @param {TronStakeType} resource - The resource to delegate.
   * @param {boolean} lock - If true, the resource will be locked.
   * @param {VisibleAndPermissionIdOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves when the delegation is complete.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/delegateresource
   */
  delegateResource(
    ownerAddress: string,
    receiverAddress: string,
    balance: BigNumber,
    resource: TronStakeType,
    lock: boolean,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Undoes a previous resource delegation from one account to another.
   *
   * @param {string} ownerAddress - The address of the account that delegated the resource.
   * @param {string} receiverAddress - The address of the account that received the resource.
   * @param {BigNumber} balance - The balance to undelegate.
   * @param {TronStakeType} resource - The resource to undelegate.
   * @param {boolean} lock - If true, the resource will remain locked.
   * @param {VisibleAndPermissionIdOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves when the undelegation is complete.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/undelegateresource
   */
  unDelegateResource(
    ownerAddress: string,
    receiverAddress: string,
    balance: BigNumber,
    resource: TronStakeType,
    lock: boolean,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Withdraws the expired unfrozen balance for an account.
   *
   * @param {string} ownerAddress - The address of the account.
   * @param {VisibleAndPermissionIdOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves when the withdrawal is complete.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/withdrawexpireunfreeze
   */
  withdrawExpireUnfreeze(
    ownerAddress: string,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Fetches the available unfreeze count for a given account.
   *
   * @param {string} ownerAddress - The address of the account.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the available unfreeze count.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/getavailableunfreezecount
   */
  getAvailableUnfreezeCount(ownerAddress: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Fetches the maximum withdrawable unfreeze amount for a given account.
   *
   * @param {string} ownerAddress - The address of the account.
   * @param {GetCanWithdrawUnfreezeAmountOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the maximum withdrawable unfreeze amount.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/getcanwithdrawunfreezeamount
   */
  getCanWithdrawUnfreezeAmount(
    ownerAddress: string,
    options?: GetCanWithdrawUnfreezeAmountOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Fetches the maximum size of delegatable resource for a given account.
   *
   * @param {string} ownerAddress - The address of the account.
   * @param {TronStakeTypeNumeric} type - The type of resource to check.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the maximum delegatable resource size.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/getcandelegatedmaxsize
   */
  getCanDelegatedMaxSize(
    ownerAddress: string,
    type: TronStakeTypeNumeric,
    options?: VisibleOption,
  ): Promise<ResponseDto<any>>

  /**
   * Fetches the delegated resource from a specified address to another, version 2.
   *
   * @param {string} fromAddress - The address of the sender.
   * @param {string} toAddress - The address of the receiver.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the delegated resources.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/getdelegatedresourcev2
   */
  getDelegatedResourceV2(
    fromAddress: string,
    toAddress: string,
    options?: VisibleOption,
  ): Promise<ResponseDto<any>>

  /**
   * Fetches the account index of the delegated resource, version 2.
   *
   * @param {string} value - The value of the delegated resource.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the account index of the delegated resource.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-account-resource-methods/getdelegatedresourceaccountindexv2
   */
  getDelegatedResourceAccountIndexV2(value: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Fetches a block from the blockchain using either its ID or number.
   *
   * @param {string} idOrNum - The ID or number of the block.
   * @param {DetailOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the requested block.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getblock
   */
  getBlock(idOrNum: string, options?: DetailOption): Promise<ResponseDto<any>>

  /**
   * Fetches a block from the blockchain using its number.
   *
   * @param {number} num - The number of the block.
   * @returns {Promise<any>} - Returns a Promise that resolves with the requested block.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getblockbynum
   */
  getBlockByNum(num: number): Promise<ResponseDto<any>>

  /**
   * Fetches a block from the blockchain using its ID.
   *
   * @param {string} id - The ID of the block.
   * @returns {Promise<any>} - Returns a Promise that resolves with the requested block.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getblockbyid
   */
  getBlockById(id: string): Promise<ResponseDto<any>>

  /**
   * Fetches the latest block from the blockchain based on the number.
   *
   * @param {number} num - The number of the block.
   * @returns {Promise<any>} - Returns a Promise that resolves with the requested block.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getblockbylatestnum
   */
  getBlockByLatestNum(num: number): Promise<ResponseDto<any>>

  /**
   * Fetches a series of blocks from the blockchain using start and end numbers.
   *
   * @param {number} startNum - The starting number of the block series.
   * @param {number} endNum - The ending number of the block series.
   * @returns {Promise<any>} - Returns a Promise that resolves with the requested series of blocks.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getblockbylimitnext
   */
  getBlockByLimitNext(startNum: number, endNum: number): Promise<ResponseDto<any>>

  /**
   * Fetches the current block from the blockchain.
   *
   * @returns {Promise<any>} - Returns a Promise that resolves with the current block.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getnowblock
   */
  getNowBlock(): Promise<ResponseDto<any>>

  /**
   * Fetches a transaction from the blockchain using its ID.
   *
   * @param {string} value - The ID of the transaction.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the requested transaction.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/gettransactionbyid
   */
  getTransactionById(value: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Fetches transaction info from the blockchain using the transaction ID.
   *
   * @param {string} value - The ID of the transaction.
   * @returns {Promise<any>} - Returns a Promise that resolves with the transaction info.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/gettransactioninfobyid
   */
  getTransactionInfoById(value: string): Promise<ResponseDto<any>>

  /**
   * Fetches transaction info from the blockchain by the block number.
   *
   * @param {number} num - The number of the block.
   * @returns {Promise<any>} - Returns a Promise that resolves with the transaction info.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/gettransactioninfobyblocknum
   */
  getTransactionInfoByBlockNum(num: number): Promise<ResponseDto<any>>

  /**
   * Lists all nodes of the network.
   *
   * @returns {Promise<any>} - Returns a Promise that resolves with the list of nodes.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/listnodes
   */
  listNodes(): Promise<ResponseDto<any>>

  /**
   * Fetches information about the current node.
   *
   * @returns {Promise<any>} - Returns a Promise that resolves with the node information.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getnodeinfo
   */
  getNodeInfo(): Promise<ResponseDto<any>>

  /**
   * Fetches the chain parameters.
   *
   * @returns {Promise<any>} - Returns a Promise that resolves with the chain parameters.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getchainparameters
   */
  getChainParameters(): Promise<ResponseDto<any>>

  /**
   * Fetches the balance of a block.
   *
   * @param {string} hash - The hash of the block.
   * @param {BigNumber} number - The number of the block.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the block balance.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getblockbalance
   */
  getBlockBalance(hash: string, number: BigNumber, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Fetches the energy prices.
   *
   * @returns {Promise<TronPrices>} - Returns a Promise that resolves with the energy prices.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getenergyprices
   */
  getEnergyPrices(): Promise<ResponseDto<TronPrices>>

  /**
   * Fetches the bandwidth prices.
   *
   * @returns {Promise<TronPrices>} - Returns a Promise that resolves with the bandwidth prices.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getbandwidthprices
   */
  getBandwidthPrices(): Promise<ResponseDto<TronPrices>>

  /**
   * Fetches the amount of TRX burned.
   *
   * @returns {Promise<any>} - Returns a Promise that resolves with the amount of TRX burned.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-query-the-network-methods/getburntrx
   */
  getBurnTRX(): Promise<ResponseDto<any>>

  /**
   * Fetches the asset issue by an account.
   *
   * @param {string} address - The address of the account.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the asset issue.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/getassetissuebyaccount
   */
  getAssetIssueByAccount(address: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Fetches the asset issue by its ID.
   *
   * @param {number} value - The ID of the asset issue.
   * @returns {Promise<any>} - Returns a Promise that resolves with the asset issue.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/getassetissuebyid
   */
  getAssetIssueById(value: number): Promise<ResponseDto<any>>

  /**
   * Fetches the asset issue by its name.
   *
   * @param {string} name - The name of the asset issue.
   * @returns {Promise<any>} - Returns a Promise that resolves with the asset issue.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/getassetissuebyname
   */
  getAssetIssueByName(name: string): Promise<ResponseDto<any>>

  /**
   * Fetches a list of all asset issues.
   *
   * @returns {Promise<any>} - Returns a Promise that resolves with a list of all asset issues.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/getassetissuelist
   */
  getAssetIssueList(): Promise<ResponseDto<any>>

  /**
   * Fetches a list of all asset issues by name.
   *
   * @param {string} value - The name of the asset issue.
   * @returns {Promise<any>} - Returns a Promise that resolves with a list of all asset issues by name.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/getassetissuelistbyname
   */
  getAssetIssueListByName(value: string): Promise<ResponseDto<any>>

  /**
   * Fetches a paginated list of all asset issues.
   *
   * @param {number} offset - The offset to start from in the list.
   * @param {number} limit - The limit of the list.
   * @returns {Promise<any>} - Returns a Promise that resolves with a paginated list of all asset issues.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/getpaginatedassetissuelist
   */
  getPaginatedAssetIssueList(offset: number, limit: number): Promise<ResponseDto<any>>

  /**
   * Transfer an asset.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} toAddress - The address of the receiver.
   * @param {string} assetName - The name of the asset.
   * @param {BigNumber} amount - The amount of the asset.
   * @param {TransferAssetIssueByAccountOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of the asset transfer.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/transferasset
   */
  transferAsset(
    ownerAddress: string,
    toAddress: string,
    assetName: string,
    amount: BigNumber,
    options?: TransferAssetIssueByAccountOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Creates an asset issue.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} name - The name of the asset.
   * @param {string} abbr - The abbreviation of the asset.
   * @param {number} totalSupply - The total supply of the asset.
   * @param {number} trxNum - The number of TRX to freeze.
   * @param {number} num - The number of frozen assets.
   * @param {number} startTime - The start time of the asset freeze.
   * @param {number} endTime - The end time of the asset freeze.
   * @param {string} url - The URL of the asset.
   * @param {CreateAssetIssueOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of the asset creation.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/createassetissue
   */
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
  ): Promise<ResponseDto<any>>

  /**
   * Participate in an asset issue.
   *
   * @param {string} toAddress - The address of the receiver.
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} assetName - The name of the asset.
   * @param {BigNumber} amount - The amount of the asset.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of the participation.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/participateassetissue
   */
  participateAssetIssue(
    toAddress: string,
    ownerAddress: string,
    assetName: string,
    amount: BigNumber,
    options?: VisibleOption,
  ): Promise<ResponseDto<any>>

  /**
   * Unfreezes an asset.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {VisibleAndPermissionIdOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of the unfreeze operation.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/unfreezeasset
   */
  unfreezeAsset(ownerAddress: string, options?: VisibleAndPermissionIdOptions): Promise<ResponseDto<any>>

  /**
   * Updates an asset.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} url - The URL of the asset.
   * @param {UpdateAssetOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of the update operation.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-trc10-token-methods/updateasset
   */
  updateAsset(ownerAddress: string, url: string, options?: UpdateAssetOptions): Promise<ResponseDto<any>>

  /**
   * Fetches contract information.
   *
   * @param {string} value - The contract address or transaction ID.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the contract information.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-smart-contract-methods/getcontract
   */
  getContract(value: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Fetches contract information.
   *
   * @param {string} value - The contract address or transaction ID.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the contract information.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-smart-contract-methods/getcontractinfo
   */
  getContractInfo(value: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Triggers a smart contract.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} contractAddress - The address of the contract.
   * @param {string} functionSelector - The function to be called in the contract.
   * @param {string} parameter - The parameters to be passed to the function.
   * @param {TriggerSmartContractOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of triggering the smart contract.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-smart-contract-methods/triggersmartcontract
   */
  triggerSmartContract(
    ownerAddress: string,
    contractAddress: string,
    functionSelector: string,
    parameter: string,
    options?: TriggerSmartContractOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Triggers a constant contract.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} contractAddress - The address of the contract.
   * @param {string} functionSelector - The function to be called in the contract.
   * @param {string} parameter - The parameters to be passed to the function.
   * @param {TriggerConstantContractOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of triggering the constant contract.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-smart-contract-methods/triggerconstantcontract
   */
  triggerConstantContract(
    ownerAddress: string,
    contractAddress: string,
    functionSelector: string,
    parameter: string,
    options?: TriggerConstantContractOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Deploys a contract.
   *
   * @param {string} abi - The application binary interface of the contract.
   * @param {string} bytecode - The bytecode of the contract.
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} name - The name of the contract.
   * @param {DeployContractOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of the contract deployment.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-smart-contract-methods/deploycontract
   */
  deployContract(
    abi: string,
    bytecode: string,
    ownerAddress: string,
    name: string,
    options?: DeployContractOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Updates the setting of a contract.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} contractAddress - The address of the contract.
   * @param {number} consumeUserResourcePercent - The percentage of user resource to consume.
   * @param {VisibleAndPermissionIdOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of the setting update.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-smart-contract-methods/updatesetting
   */
  updateSetting(
    ownerAddress: string,
    contractAddress: string,
    consumeUserResourcePercent: number,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Updates the energy limit of a contract.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} contractAddress - The address of the contract.
   * @param {number} originEnergyLimit - The new energy limit.
   * @param {VisibleAndPermissionIdOptions} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of the energy limit update.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-smart-contract-methods/updateenergylimit
   */
  updateEnergyLimit(
    ownerAddress: string,
    contractAddress: string,
    originEnergyLimit: number,
    options?: VisibleAndPermissionIdOptions,
  ): Promise<ResponseDto<any>>

  /**
   * Clears the ABI of a contract.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} contractAddress - The address of the contract.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the result of the ABI clear operation.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-smart-contract-methods/clearabi
   */
  clearAbi(ownerAddress: string, contractAddress: string, options?: VisibleOption): Promise<ResponseDto<any>>

  /**
   * Estimates the energy consumption of a contract call.
   *
   * @param {string} ownerAddress - The address of the owner.
   * @param {string} contractAddress - The address of the contract.
   * @param {string} functionSelector - The function to be called in the contract.
   * @param {string} parameter - The parameters to be passed to the function.
   * @param {VisibleOption} [options] - Additional options.
   * @returns {Promise<any>} - Returns a Promise that resolves with the estimated energy consumption.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-smart-contract-methods/estimateenergy
   */
  estimateEnergy(
    ownerAddress: string,
    contractAddress: string,
    functionSelector: string,
    parameter: string,
    options?: VisibleOption,
  ): Promise<ResponseDto<any>>
}
