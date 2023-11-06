/* eslint-disable @typescript-eslint/no-explicit-any */
import { Block } from '../../../api/api.dto'
import { QueryParams } from '../../../dto'
import { GetI } from '../../../dto/GetI'
import { Box } from '../../../dto/rpc/AlgorandAlgodRpcSuite'
import {
  AccountInformationRequest,
  AccountRequest,
  AccountResponse,
  AccountsResponse,
  AccountTransactionsRequest,
  AccountTransactionsResponse,
  AlgorandIndexerRpcSuite,
  ApplicationBoxesParams,
  ApplicationBoxesResponse,
  ApplicationBoxParams,
  ApplicationSearchParams,
  ApplicationSearchResponse,
  AppLookupParams,
  AppLookupResponse,
  AppsLocalStateRequest,
  AppsLocalStateResponse,
  AssetBalancesParams,
  AssetBalancesResponse,
  AssetLookupParams,
  AssetLookupResponse,
  AssetSearchParams,
  AssetSearchResponse,
  AssetsRequest,
  AssetsResponse,
  AssetTransactionsParams,
  AssetTransactionsResponse,
  BlockLookupParams,
  CreatedApplicationsRequest,
  CreatedApplicationsResponse,
  CreatedAssetsRequest,
  CreatedAssetsResponse,
  HealthCheck,
  LogsLookupParams,
  LogsLookupResponse,
  TransactionLookupParams,
  TransactionLookupResponse,
  TransactionsParams,
  TransactionsResponse,
} from '../../../dto/rpc/AlgorandIndexerRpcSuite'
import { Utils } from '../../../util'

export abstract class AbstractAlgorandIndexerRpc implements AlgorandIndexerRpcSuite {
  protected abstract get<T>(get: GetI): Promise<T>

  private async sendGet<T>({ path, queryParams }: { path: string; queryParams?: QueryParams }): Promise<T> {
    return this.get({ path: Utils.addQueryParams(path, Utils.camelToDashCase, queryParams) })
  }

  getAccount(params: AccountInformationRequest): Promise<AccountResponse> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `/v2/accounts/${accountId}`, queryParams: rest })
  }

  getAccountApplications(params: CreatedApplicationsRequest): Promise<CreatedApplicationsResponse> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `/v2/accounts/${accountId}/created-applications`, queryParams: rest })
  }

  getAccountAppsLocalState(params: AppsLocalStateRequest): Promise<AppsLocalStateResponse> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `/v2/accounts/${accountId}/apps-local-state`, queryParams: rest })
  }

  getAccountAssets(params: AssetsRequest): Promise<AssetsResponse> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `/v2/accounts/${accountId}/assets`, queryParams: rest })
  }

  getAccountCreatedAssets(params: CreatedAssetsRequest): Promise<CreatedAssetsResponse> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `/v2/accounts/${accountId}/created-assets`, queryParams: rest })
  }

  getAccountTransactions(params: AccountTransactionsRequest): Promise<AccountTransactionsResponse> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `/v2/accounts/${accountId}/transactions`, queryParams: rest })
  }

  getAccounts(params: AccountRequest): Promise<AccountsResponse> {
    const { ...rest } = params
    return this.sendGet({ path: `/v2/accounts`, queryParams: rest })
  }

  getApplication(params: AppLookupParams): Promise<AppLookupResponse> {
    const { applicationId, ...rest } = params
    return this.sendGet({ path: `/v2/applications/${applicationId}`, queryParams: rest })
  }

  getApplicationBox(params: ApplicationBoxParams): Promise<Box> {
    const { applicationId, ...rest } = params
    return this.sendGet({ path: `/v2/applications/${applicationId}/box`, queryParams: rest })
  }

  getApplicationBoxes(params: ApplicationBoxesParams): Promise<ApplicationBoxesResponse> {
    const { applicationId, ...rest } = params
    return this.sendGet({ path: `/v2/applications/${applicationId}/boxes`, queryParams: rest })
  }

  getApplicationLogs(params: LogsLookupParams): Promise<LogsLookupResponse> {
    const { applicationId, ...rest } = params
    return this.sendGet({ path: `/v2/applications/${applicationId}/logs`, queryParams: rest })
  }

  getApplications(params: ApplicationSearchParams): Promise<ApplicationSearchResponse> {
    const { ...rest } = params
    return this.sendGet({ path: `/v2/applications`, queryParams: rest })
  }

  getAsset(params: AssetLookupParams): Promise<AssetLookupResponse> {
    const { assetId, ...rest } = params
    return this.sendGet({ path: `/v2/assets/${assetId}`, queryParams: rest })
  }

  getAssetBalances(params: AssetBalancesParams): Promise<AssetBalancesResponse> {
    const { assetId, ...rest } = params
    return this.sendGet({ path: `/v2/assets/${assetId}/balances`, queryParams: rest })
  }

  getAssetTransactions(params: AssetTransactionsParams): Promise<AssetTransactionsResponse> {
    const { assetId, ...rest } = params
    return this.sendGet({ path: `/v2/assets/${assetId}/transactions`, queryParams: rest })
  }

  getAssets(params: AssetSearchParams): Promise<AssetSearchResponse> {
    const { ...rest } = params
    return this.sendGet({ path: `/v2/assets`, queryParams: rest })
  }

  getBlock(params: BlockLookupParams): Promise<Block> {
    const { roundNumber, ...rest } = params
    return this.sendGet({ path: `/v2/blocks/${roundNumber}`, queryParams: rest })
  }

  getHealth(): Promise<HealthCheck> {
    return this.sendGet({ path: `/health` })
  }

  getTransaction(params: TransactionLookupParams): Promise<TransactionLookupResponse> {
    const { txid, ...rest } = params
    return this.sendGet({ path: `/v2/transactions/${txid}`, queryParams: rest })
  }

  getTransactions(params: TransactionsParams): Promise<TransactionsResponse> {
    const { ...rest } = params
    return this.sendGet({ path: `/v2/transactions`, queryParams: rest })
  }
}
