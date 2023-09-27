/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from 'typedi'
import { PostI } from '../../../dto/PostI'
import {
  AbiBinToJson,
  AbiJsonToBin,
  AccountName,
  BlockNum,
  BlockNumOrId,
  EosRpcSuite,
  GetAccountByAuthorizers,
  GetActivatedProtocolFeatures,
  GetCode,
  GetCurrencyBalance,
  GetCurrencyStats,
  GetKVTableRows,
  GetProducers,
  GetRequiredKeys,
  GetTableByScope,
  GetTableRows,
  PushTransaction,
  Transaction,
} from '../../../dto/rpc/EosRpcSuite'
import { Utils } from '../../../util'

@Service()
export abstract class AbstractEosRpc implements EosRpcSuite {
  protected abstract post<T>(post: PostI): Promise<T>
  abstract destroy(): void
  abstract getRpcNodeUrl(): string

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

  abiBinToJson(body: AbiBinToJson): Promise<any> {
    return this.sendPost({ path: 'abi_bin_to_json', body })
  }

  abiJsonToBin(body: AbiJsonToBin): Promise<any> {
    return this.sendPost({ path: 'abi_json_to_bin', body })
  }

  getAbi(body: AccountName): Promise<any> {
    return this.sendPost({ path: 'get_abi', body })
  }

  getAccount(body: AccountName): Promise<any> {
    return this.sendPost({ path: 'get_account', body })
  }

  getAccountsByAuthorizers(body: GetAccountByAuthorizers): Promise<any> {
    return this.sendPost({ path: 'get_accounts_by_authorizers', body })
  }

  getActivatedProtocolFeatures(body: GetActivatedProtocolFeatures): Promise<any> {
    return this.sendPost({ path: 'get_activated_protocol_features', body })
  }

  getBlock(body: BlockNumOrId): Promise<any> {
    return this.sendPost({ path: 'get_block', body })
  }

  getBlockHeaderState(body: BlockNumOrId): Promise<any> {
    return this.sendPost({ path: 'get_block_header_state', body })
  }

  getBlockInfo(body: BlockNum): Promise<any> {
    return this.sendPost({ path: 'get_block_info', body })
  }

  getCode(body: GetCode): Promise<any> {
    return this.sendPost({ path: 'get_code', body })
  }

  getCurrencyBalance(body: GetCurrencyBalance): Promise<any> {
    return this.sendPost({ path: 'get_currency_balance', body })
  }

  getCurrencyStats(body: GetCurrencyStats): Promise<any> {
    return this.sendPost({ path: 'get_currency_stats', body })
  }

  getInfo(): Promise<any> {
    return this.sendPost({ path: 'get_info' })
  }

  getKvTableRows(body: GetKVTableRows): Promise<any> {
    return this.sendPost({ path: 'get_kv_table_rows', body })
  }

  getProducers(body: GetProducers): Promise<any> {
    return this.sendPost({ path: 'get_producers', body })
  }

  getRawAbi(body: AccountName): Promise<any> {
    return this.sendPost({ path: 'get_raw_abi', body })
  }

  getRawCodeAndAbi(body: AccountName): Promise<any> {
    return this.sendPost({ path: 'get_raw_code_and_abi', body })
  }

  getRequiredKeys(body: GetRequiredKeys): Promise<any> {
    return this.sendPost({ path: 'get_required_keys', body })
  }

  getScheduledTransaction(body: GetProducers): Promise<any> {
    return this.sendPost({ path: 'get_scheduled_transaction', body })
  }

  getTableByScope(body: GetTableByScope): Promise<any> {
    return this.sendPost({ path: 'get_table_by_scope', body })
  }

  getTableRows(body: GetTableRows): Promise<any> {
    return this.sendPost({ path: 'get_table_rows', body })
  }

  pushTransaction(body: PushTransaction): Promise<any> {
    return this.sendPost({ path: 'push_transaction', body })
  }

  pushTransactions(body: Transaction[]): Promise<any> {
    return this.sendPost({ path: 'push_transactions', body })
  }

  sendTransaction(body: PushTransaction): Promise<any> {
    return this.sendPost({ path: 'send_transaction', body })
  }
}
