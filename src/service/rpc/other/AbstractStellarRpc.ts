/* eslint-disable @typescript-eslint/no-explicit-any */

import { Service } from 'typedi'
import { QueryParams } from '../../../dto'
import { GetI } from '../../../dto/GetI'
import { PostI } from '../../../dto/PostI'
import {
  Account,
  Asset,
  BaseParams,
  ClaimableBalance,
  Effect,
  FeeStats,
  GetAccountDataParams,
  GetAccountEffectsParams,
  GetAccountParams,
  GetAccountPaymentsParams,
  GetAccountTradesParams,
  GetAccountTransactionsParams,
  GetAccountsParams,
  GetAssetsParams,
  GetClaimableBalanceParams,
  GetClaimableBalancesParams,
  GetClaimableOperationsParams,
  GetClaimableTransactionsParams,
  GetEffectsParams,
  GetLedgerEffectsParams,
  GetLedgerOperationsParams,
  GetLedgerParams,
  GetLedgerPaymentsParams,
  GetLedgerTransactionsParams,
  GetLiquidityPoolEffectsParams,
  GetLiquidityPoolOperationsParams,
  GetLiquidityPoolParams,
  GetLiquidityPoolTradesParams,
  GetLiquidityPoolTransactionsParams,
  GetLiquidityPoolsParams,
  GetOfferParams,
  GetOfferTradesParams,
  GetOffersByAccountIdParams,
  GetOffersParams,
  GetOperationEffectsParams,
  GetOperationParams,
  GetOperationsByAccountIdParams,
  GetOperationsParams,
  GetOrderBookParams,
  GetPaymentsParams,
  GetStrictReceivePaymentPathsParams,
  GetStrictSendPaymentPathsParams,
  GetTradeAggregationsParams,
  GetTradesParams,
  GetTransactionEffectsParams,
  GetTransactionOperationsParams,
  GetTransactionParams,
  GetTransactionsParams,
  Ledger,
  Links,
  LiquidityPools,
  Offer,
  OfferResponse,
  Operation,
  OperationResponse,
  Order,
  Path,
  Payment,
  RecordClaimableBalance,
  RecordLiquidityPool,
  StellarRpcSuite,
  SubmitTransaction,
  SubmitTransactionParams,
  Trade,
  TradeAggregation,
  Transaction,
} from '../../../dto/rpc/StellarRpcSuite'
import { Utils } from '../../../util'

@Service()
export abstract class AbstractStellarRpc implements StellarRpcSuite {
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

  getAccounts(params?: GetAccountsParams): Promise<Links & Account> {
    return this.sendGet({ path: 'accounts', queryParams: params as QueryParams })
  }

  getAccount(params: GetAccountParams): Promise<Links & Account> {
    return this.sendGet({ path: `accounts/${params.accountId}` })
  }

  getAccountTransactions(params: GetAccountTransactionsParams): Promise<Transaction> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `accounts/${accountId}/transactions`, queryParams: rest })
  }

  getAccountOperations(params: GetOperationsByAccountIdParams): Promise<OperationResponse> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `accounts/${accountId}/operations`, queryParams: rest })
  }

  getAccountPayments(params: GetAccountPaymentsParams): Promise<Links & Payment> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `accounts/${accountId}/payments`, queryParams: rest })
  }

  getAccountEffects(params: GetAccountEffectsParams): Promise<Effect> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `accounts/${accountId}/effects`, queryParams: rest })
  }

  getAccountOffers(params: GetOffersByAccountIdParams): Promise<OfferResponse> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `accounts/${accountId}/offers`, queryParams: rest })
  }

  getAccountTrades(params: GetAccountTradesParams): Promise<Trade> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `accounts/${accountId}/trades`, queryParams: rest })
  }

  getAccountData(params: GetAccountDataParams): Promise<{ value: string }> {
    const { accountId, ...rest } = params
    return this.sendGet({ path: `accounts/${accountId}/data/${rest.key}` })
  }

  getAssets(params?: GetAssetsParams): Promise<Links & Asset> {
    return this.sendGet({ path: 'assets', queryParams: params as QueryParams })
  }

  getClaimableBalances(params?: GetClaimableBalancesParams): Promise<ClaimableBalance> {
    return this.sendGet({ path: 'claimable_balances', queryParams: params as QueryParams })
  }

  getClaimableBalance(params: GetClaimableBalanceParams): Promise<RecordClaimableBalance> {
    return this.sendGet({ path: `claimable_balances/${params.claimableBalanceId}` })
  }

  getClaimableTransactions(params: GetClaimableTransactionsParams): Promise<Transaction> {
    const { claimableBalanceId, ...rest } = params
    return this.sendGet({ path: `claimable_balances/${claimableBalanceId}/transactions`, queryParams: rest })
  }

  getClaimableOperations(params: GetClaimableOperationsParams): Promise<Links & OperationResponse> {
    const { claimableBalanceId, ...rest } = params
    return this.sendGet({ path: `claimable_balances/${claimableBalanceId}/operations`, queryParams: rest })
  }

  getEffects(params?: GetEffectsParams): Promise<Effect> {
    return this.sendGet({ path: 'effects', queryParams: params as QueryParams })
  }

  getFeeStats(): Promise<FeeStats> {
    return this.sendGet({ path: 'fee_stats' })
  }

  getLiquidityPools(params?: GetLiquidityPoolsParams): Promise<LiquidityPools> {
    return this.sendGet({ path: 'liquidity_pools', queryParams: params as QueryParams })
  }

  getLiquidityPool(params: GetLiquidityPoolParams): Promise<RecordLiquidityPool> {
    const { liquidityPoolId, ...rest } = params
    return this.sendGet({ path: `liquidity_pools/${liquidityPoolId}`, queryParams: rest })
  }

  getLiquidityPoolEffects(params: GetLiquidityPoolEffectsParams): Promise<Effect> {
    const { liquidityPoolId, ...rest } = params
    return this.sendGet({ path: `liquidity_pools/${liquidityPoolId}/effects`, queryParams: rest })
  }

  getLiquidityPoolTrades(params: GetLiquidityPoolTradesParams): Promise<Trade> {
    const { liquidityPoolId, ...rest } = params
    return this.sendGet({ path: `liquidity_pools/${liquidityPoolId}/trades`, queryParams: rest })
  }

  getLiquidityPoolTransactions(params: GetLiquidityPoolTransactionsParams): Promise<Transaction> {
    const { liquidityPoolId, ...rest } = params
    return this.sendGet({ path: `liquidity_pools/${liquidityPoolId}/transactions`, queryParams: rest })
  }

  getLiquidityPoolOperations(params: GetLiquidityPoolOperationsParams): Promise<Operation> {
    const { liquidityPoolId, ...rest } = params
    return this.sendGet({ path: `liquidity_pools/${liquidityPoolId}/operations`, queryParams: rest })
  }

  getLedger(params: GetLedgerParams): Promise<Ledger> {
    const { sequence, ...rest } = params
    return this.sendGet({ path: `ledgers/${sequence}`, queryParams: rest })
  }

  getLedgerTransactions(params: GetLedgerTransactionsParams): Promise<Transaction> {
    const { sequence, ...rest } = params
    return this.sendGet({ path: `ledgers/${sequence}/transactions`, queryParams: rest })
  }

  getLedgerPayments(params: GetLedgerPaymentsParams): Promise<Links & Payment> {
    const { sequence, ...rest } = params
    return this.sendGet({ path: `ledgers/${sequence}/payments`, queryParams: rest })
  }

  getLedgerOperations(params: GetLedgerOperationsParams): Promise<Operation> {
    const { sequence, ...rest } = params
    return this.sendGet({ path: `ledgers/${sequence}/operations`, queryParams: rest })
  }

  getLedgerEffects(params: GetLedgerEffectsParams): Promise<(Links & Effect)[]> {
    const { sequence, ...rest } = params
    return this.sendGet({ path: `ledgers/${sequence}/effects`, queryParams: rest })
  }

  getLedgers(params?: BaseParams): Promise<Ledger> {
    return this.sendGet({ path: 'ledgers', queryParams: params as QueryParams })
  }

  getOffers(params?: GetOffersParams): Promise<Offer> {
    return this.sendGet({ path: 'offers', queryParams: params as QueryParams })
  }

  getOffer(params: GetOfferParams): Promise<Ledger> {
    const { offerId, ...rest } = params
    return this.sendGet({ path: `offers/${offerId}`, queryParams: rest })
  }

  getOfferTrades(params: GetOfferTradesParams): Promise<Trade> {
    const { offerId, ...rest } = params
    return this.sendGet({ path: `offers/${offerId}/trades`, queryParams: rest })
  }

  getOrderBook(params: GetOrderBookParams): Promise<Order> {
    const { sellingAssetType, ...rest } = params
    return this.sendGet({ path: `order_book/${sellingAssetType}`, queryParams: rest as QueryParams })
  }

  getTradeAggregations(params: GetTradeAggregationsParams): Promise<TradeAggregation> {
    const { baseAssetType, counterAssetType, ...rest } = params
    return this.sendGet({
      path: `trade_aggregations/${baseAssetType}${counterAssetType}`,
      queryParams: rest as QueryParams,
    })
  }

  getTrades(params?: GetTradesParams): Promise<Links & Trade> {
    return this.sendGet({ path: 'trades', queryParams: params as QueryParams })
  }

  getTransaction(params: GetTransactionParams): Promise<Transaction> {
    const { transactionHash, ...rest } = params
    return this.sendGet({ path: `transactions/${transactionHash}`, queryParams: rest })
  }

  getTransactionOperations(params: GetTransactionOperationsParams): Promise<Operation> {
    const { transactionHash, ...rest } = params
    return this.sendGet({ path: `transactions/${transactionHash}/operations`, queryParams: rest })
  }

  getTransactionEffects(params: GetTransactionEffectsParams): Promise<Links & Effect> {
    const { transactionHash, ...rest } = params
    return this.sendGet({ path: `transactions/${transactionHash}/effects`, queryParams: rest })
  }

  getTransactions(params?: GetTransactionsParams): Promise<Links & Transaction> {
    return this.sendGet({ path: 'transactions', queryParams: params as QueryParams })
  }

  getOperation(params: GetOperationParams): Promise<Operation> {
    const { id, ...rest } = params
    return this.sendGet({ path: `operations/${id}`, queryParams: rest })
  }

  getOperationEffects(params: GetOperationEffectsParams): Promise<Links & Effect> {
    const { id, ...rest } = params
    return this.sendGet({ path: `operations/${id}/effects`, queryParams: rest })
  }

  getOperations(params?: GetOperationsParams): Promise<Operation> {
    return this.sendGet({ path: 'operations', queryParams: params as QueryParams })
  }

  getPayments(params?: GetPaymentsParams): Promise<Links & OperationResponse> {
    return this.sendGet({ path: 'payments', queryParams: params as QueryParams })
  }

  getStrictReceivePaymentPaths(params: GetStrictReceivePaymentPathsParams): Promise<Path> {
    const { sourceAssets, ...rest } = params
    const sourceAssetsString = sourceAssets?.join(',')
    return this.sendGet({
      path: `paths/strict-receive`,
      queryParams: {
        ...rest,
        ...(sourceAssetsString && { sourceAssets: sourceAssetsString }),
      },
    })
  }

  getStrictSendPaymentPaths(params: GetStrictSendPaymentPathsParams): Promise<Path> {
    const { destinationAssets, sourceAssets, ...rest } = params
    const destinationAssetsString = destinationAssets?.join(',')
    const sourceAssetsString = sourceAssets?.join(',')
    return this.sendGet({
      path: `paths/strict-send`,
      queryParams: {
        ...rest,
        ...(destinationAssetsString && { destinationAssets: destinationAssetsString }),
        ...(sourceAssetsString && { sourceAssets: sourceAssetsString }),
      },
    })
  }

  submitTransaction(params: SubmitTransactionParams): Promise<SubmitTransaction> {
    return this.sendPost({ path: 'transactions', queryParams: params as unknown as QueryParams })
  }
}
