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
  XrpRpcSuite,
} from '../../../dto'
import { Utils } from '../../../util'
import { AbstractBatchRpc } from '../generic'

const generateXrpParams = (required?: { [key: string]: any }, optional?: { [key: string]: any }) => {
  const xrpParams: { [name: string]: unknown } = {}
  const props = (required ? Object.entries(required) : []).concat(optional ? Object.entries(optional) : [])
  for (const [name, value] of props) {
    xrpParams[Utils.camelToSnakeCase(name)] = value
  }
  return [xrpParams]
}

@Service({
  factory: (data: { id: string }) => {
    return new XrpRpc(data.id)
  },
  transient: true,
})
export class XrpRpc extends AbstractBatchRpc implements XrpRpcSuite {
  constructor(id: string) {
    super(id)
  }

  accountChannels(account: string, options?: AccountChannelsOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall(
        'account_channels',
        generateXrpParams(
          {
            account,
          },
          options,
        ),
      ),
    )
  }

  accountCurrencies(account: string, options?: Ledger & StrictOption): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('account_currencies', generateXrpParams({ account }, options)),
    )
  }

  accountInfo(account: string, options?: AccountInfoOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('account_info', generateXrpParams({ account }, options)),
    )
  }

  accountLines(account: string, options?: AccountLinesOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('account_lines', generateXrpParams({ account }, options)),
    )
  }

  accountNfts(account: string, options?: Ledger & Pagination): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('account_nfts', generateXrpParams({ account }, options)),
    )
  }

  accountObjects(account: string, options?: AccountObjectsOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall(
        'account_objects',
        generateXrpParams(
          {
            account,
          },
          options,
        ),
      ),
    )
  }

  accountOffers(account: string, options?: Ledger & Pagination & StrictOption): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('account_offers', generateXrpParams({ account }, options)),
    )
  }

  accountTx(account: string, options?: AccountTxOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall(
        'account_tx',
        generateXrpParams(
          {
            account,
          },
          options,
        ),
      ),
    )
  }

  gatewayBalances(account: string, options?: GatewayBalancesOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('gateway_balances', generateXrpParams({ account }, options)),
    )
  }

  norippleCheck(account: string, role: string, options?: NorippleCheckOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('noripple_check', generateXrpParams({ account, role }, options)),
    )
  }

  ledger(options?: LedgerOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('ledger', generateXrpParams({}, options)),
    )
  }

  ledgerClosed(): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('ledger_closed'),
    )
  }

  ledgerCurrent(): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('ledger_current'),
    )
  }

  ledgerData(options?: Ledger & LedgerBinaryOption & Pagination & TypeOption): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('ledger_data', generateXrpParams({}, options)),
    )
  }

  ledgerEntry(options?: LedgerEntryOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('ledger_entry', generateXrpParams({}, options)),
    )
  }

  submit(tx: Transaction, options?: Secrets & FailOption & AutoFilling): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall(
        'submit',
        generateXrpParams(typeof tx === 'string' ? { txBlob: tx } : { txJson: tx }, options),
      ),
    )
  }

  submitMultisigned(txJson: TxJson, options?: FailOption): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('submit_multisigned', generateXrpParams({ txJson }, options)),
    )
  }

  transactionEntry(txHash: string, options?: Ledger): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('transaction_entry', generateXrpParams({ txHash }, options)),
    )
  }

  tx(transaction: string, options?: TxOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('tx', generateXrpParams({ transaction }, options)),
    )
  }

  txHistory(start: number): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('txHistory', generateXrpParams({ start })),
    )
  }

  sign(txJson: TxJson, options?: Secrets & AutoFilling): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall(
        'sign',
        generateXrpParams(
          {
            txJson,
          },
          options,
        ),
      ),
    )
  }

  signFor(account: string, txJson: TxJson, options?: Secrets): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('sign_for', generateXrpParams({ account, txJson }, options)),
    )
  }

  bookOffers(takerGets: Currency, takerPays: Currency, options?: BookOffersOptions): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('book_offers', generateXrpParams({ takerGets, takerPays }, options)),
    )
  }

  depositAuthorized(sourceAccount: string, destinationAccount: string, options?: Ledger): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall(
        'deposit_authorized',
        generateXrpParams(
          {
            sourceAccount,
            destinationAccount,
          },
          options,
        ),
      ),
    )
  }

  nftBuyOffers(nftId: string, options?: Ledger & Pagination): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('nft_buy_offers', generateXrpParams({ nftId }, options)),
    )
  }

  nftSellOffers(nftId: string, options?: Ledger & Pagination): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('nft_sell_offers', generateXrpParams({ nftId }, options)),
    )
  }

  ripplePathFind(
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    options?: RipplePathFindOptions,
  ): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall(
        'ripple_path_find',
        generateXrpParams(
          {
            sourceAccount,
            destinationAccount,
            destinationAmount,
          },
          options,
        ),
      ),
    )
  }

  channelAuthorize(amount: string, channelId: string, options?: Secrets): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall(
        'channel_authorize',
        generateXrpParams(
          {
            amount,
            channelId,
          },
          options,
        ),
      ),
    )
  }

  channelVerify(amount: string, channelId: string, publicKey: string, signature: string): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('channel_verify', generateXrpParams({ amount, channelId, publicKey, signature })),
    )
  }

  fee(): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(this.getRpcNodeUrl(), Utils.prepareRpcCall('fee'))
  }

  serverInfo(): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('server_info', generateXrpParams()),
    )
  }

  serverState(): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('server_state'),
    )
  }

  manifest(publicKey: string): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('manifest', generateXrpParams({ publicKey })),
    )
  }

  ping(): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(this.getRpcNodeUrl(), Utils.prepareRpcCall('ping'))
  }

  random(): Promise<any> {
    return this.connector.rpcCall<JsonRpcResponse<any>>(this.getRpcNodeUrl(), Utils.prepareRpcCall('random'))
  }
}
