/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from 'typedi'
import {
  AccountChannelsOptions,
  AccountInfoOptions,
  AccountLinesOptions,
  AccountObjectsOptions,
  AccountTxOptions,
  AutoFilling,
  BookOffersOptions,
  Currency,
  CurrencyAmount,
  FailOption,
  GatewayBalancesOptions,
  JsonRpcResponse,
  Ledger,
  LedgerBinaryOption,
  LedgerEntryOptions,
  LedgerOptions,
  NorippleCheckOptions,
  Pagination,
  RipplePathFindOptions,
  Secrets,
  StrictOption,
  Transaction,
  TxJson,
  TxOptions,
  TypeOption,
  XrpRpcInterface,
} from '../../../dto'
import { Utils } from '../../../util'

const generateXrpParams = (required?: { [key: string]: any }, optional?: { [key: string]: any }) => {
  const xrpParams: { [name: string]: unknown } = {}
  const props = (required ? Object.entries(required) : []).concat(optional ? Object.entries(optional) : [])
  for (const [name, value] of props) {
    xrpParams[Utils.camelToSnakeCase(name)] = value
  }
  return [xrpParams]
}

@Service()
export abstract class AbstractXrpRpc implements XrpRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  accountChannels(account: string, options?: AccountChannelsOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>(
      'account_channels',
      generateXrpParams(
        {
          account,
        },
        options,
      ),
    )
  }

  accountCurrencies(account: string, options?: Ledger & StrictOption): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('account_currencies', generateXrpParams({ account }, options))
  }

  accountInfo(account: string, options?: AccountInfoOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('account_info', generateXrpParams({ account }, options))
  }

  accountLines(account: string, options?: AccountLinesOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('account_lines', generateXrpParams({ account }, options))
  }

  accountNfts(account: string, options?: Ledger & Pagination): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('account_nfts', generateXrpParams({ account }, options))
  }

  accountObjects(account: string, options?: AccountObjectsOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('account_objects', generateXrpParams({ account }, options))
  }

  accountOffers(account: string, options?: Ledger & Pagination & StrictOption): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('account_offers', generateXrpParams({ account }, options))
  }

  accountTx(account: string, options?: AccountTxOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('account_tx', generateXrpParams({ account }, options))
  }

  gatewayBalances(account: string, options?: GatewayBalancesOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('gateway_balances', generateXrpParams({ account }, options))
  }

  norippleCheck(account: string, role: string, options?: NorippleCheckOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('noripple_check', generateXrpParams({ account, role }, options))
  }

  ledger(options?: LedgerOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('ledger', generateXrpParams({}, options))
  }

  ledgerClosed(): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('ledger_closed')
  }

  ledgerCurrent(): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('ledger_current')
  }
  ledgerData(options?: Ledger & LedgerBinaryOption & Pagination & TypeOption): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('ledger_data', generateXrpParams({}, options))
  }

  ledgerEntry(options?: LedgerEntryOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('ledger_entry', generateXrpParams({}, options))
  }

  submit(tx: Transaction, options?: Secrets & FailOption & AutoFilling): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>(
      'submit',
      generateXrpParams(typeof tx === 'string' ? { txBlob: tx } : { txJson: tx }, options),
    )
  }

  submitMultisigned(txJson: TxJson, options?: FailOption): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('submit_multisigned', generateXrpParams({ txJson }, options))
  }

  transactionEntry(txHash: string, options?: Ledger): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('transaction_entry', generateXrpParams({ txHash }, options))
  }

  tx(transaction: string, options?: TxOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('tx', generateXrpParams({ transaction }, options))
  }

  txHistory(start: number): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('txHistory', generateXrpParams({ start }))
  }

  sign(txJson: TxJson, options?: Secrets & AutoFilling): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('sign', generateXrpParams({ txJson }, options))
  }

  signFor(account: string, txJson: TxJson, options?: Secrets): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('sign_for', generateXrpParams({ account, txJson }, options))
  }

  bookOffers(takerGets: Currency, takerPays: Currency, options?: BookOffersOptions): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>(
      'book_offers',
      generateXrpParams({ takerGets, takerPays }, options),
    )
  }

  depositAuthorized(sourceAccount: string, destinationAccount: string, options?: Ledger): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>(
      'deposit_authorized',
      generateXrpParams({ sourceAccount, destinationAccount }, options),
    )
  }

  nftBuyOffers(nftId: string, options?: Ledger & Pagination): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('nft_buy_offers', generateXrpParams({ nftId }, options))
  }

  nftSellOffers(nftId: string, options?: Ledger & Pagination): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('nft_sell_offers', generateXrpParams({ nftId }, options))
  }

  ripplePathFind(
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    options?: RipplePathFindOptions,
  ): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>(
      'ripple_path_find',
      generateXrpParams({ sourceAccount, destinationAccount, destinationAmount }, options),
    )
  }

  channelAuthorize(amount: string, channelId: string, options?: Secrets): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>(
      'channel_authorize',
      generateXrpParams({ amount, channelId }, options),
    )
  }

  channelVerify(amount: string, channelId: string, publicKey: string, signature: string): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>(
      'channel_verify',
      generateXrpParams({ amount, channelId, publicKey, signature }),
    )
  }

  fee(): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('fee')
  }

  serverInfo(): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('server_info')
  }
  serverState(): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('server_state')
  }

  manifest(publicKey: string): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('manifest', generateXrpParams({ publicKey }))
  }

  ping(): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('ping')
  }

  random(): Promise<any> {
    return this.rpcCall<JsonRpcResponse<any>>('random')
  }
}
