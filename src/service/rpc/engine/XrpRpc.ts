/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
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
  XrpResult,
  XrpRpcSuite,
} from '../../../dto'
import { CONFIG, Utils } from '../../../util'
import { AbstractJsonRpc } from './AbstractJsonRpc'

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
export class XrpRpc extends AbstractJsonRpc implements XrpRpcSuite {
  constructor(id: string) {
    super(id, Container.of(id).get(CONFIG).network)
  }

  accountChannels(account: string, options?: AccountChannelsOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_channels',
          generateXrpParams(
            {
              account,
            },
            options,
          ),
        ),
      )
      .then((r) => r.result)
  }

  accountCurrencies(account: string, options?: Ledger & StrictOption): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_currencies', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  accountInfo(account: string, options?: AccountInfoOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_info', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  accountLines(account: string, options?: AccountLinesOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_lines', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  accountNfts(account: string, options?: Ledger & Pagination): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_nfts', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  accountObjects(account: string, options?: AccountObjectsOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_objects',
          generateXrpParams(
            {
              account,
            },
            options,
          ),
        ),
      )
      .then((r) => r.result)
  }

  accountOffers(account: string, options?: Ledger & Pagination & StrictOption): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_offers', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  accountTx(account: string, options?: AccountTxOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_tx',
          generateXrpParams(
            {
              account,
            },
            options,
          ),
        ),
      )
      .then((r) => r.result)
  }

  gatewayBalances(account: string, options?: GatewayBalancesOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('gateway_balances', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  norippleCheck(account: string, role: string, options?: NorippleCheckOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('noripple_check', generateXrpParams({ account, role }, options)),
      )
      .then((r) => r.result)
  }

  ledger(options?: LedgerOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('ledger', generateXrpParams({}, options)),
      )
      .then((r) => r.result)
  }

  ledgerClosed(): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('ledger_closed'))
      .then((r) => r.result)
  }

  ledgerCurrent(): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('ledger_current'))
      .then((r) => r.result)
  }

  ledgerData(options?: Ledger & LedgerBinaryOption & Pagination & TypeOption): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('ledger_data', generateXrpParams({}, options)),
      )
      .then((r) => r.result)
  }

  ledgerEntry(options?: LedgerEntryOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('ledger_entry', generateXrpParams({}, options)),
      )
      .then((r) => r.result)
  }

  submit(tx: Transaction, options?: Secrets & FailOption & AutoFilling): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'submit',
          generateXrpParams(typeof tx === 'string' ? { txBlob: tx } : { txJson: tx }, options),
        ),
      )
      .then((r) => r.result)
  }

  submitMultisigned(txJson: TxJson, options?: FailOption): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('submit_multisigned', generateXrpParams({ txJson }, options)),
      )
      .then((r) => r.result)
  }

  transactionEntry(txHash: string, options?: Ledger): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('transaction_entry', generateXrpParams({ txHash }, options)),
      )
      .then((r) => r.result)
  }

  tx(transaction: string, options?: TxOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('tx', generateXrpParams({ transaction }, options)),
      )
      .then((r) => r.result)
  }

  txHistory(start: number): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('txHistory', generateXrpParams({ start })),
      )
      .then((r) => r.result)
  }

  sign(txJson: TxJson, options?: Secrets & AutoFilling): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'sign',
          generateXrpParams(
            {
              txJson,
            },
            options,
          ),
        ),
      )
      .then((r) => r.result)
  }

  signFor(account: string, txJson: TxJson, options?: Secrets): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('sign_for', generateXrpParams({ account, txJson }, options)),
      )
      .then((r) => r.result)
  }

  bookOffers(takerGets: Currency, takerPays: Currency, options?: BookOffersOptions): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('book_offers', generateXrpParams({ takerGets, takerPays }, options)),
      )
      .then((r) => r.result)
  }

  depositAuthorized(sourceAccount: string, destinationAccount: string, options?: Ledger): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
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
      .then((r) => r.result)
  }

  nftBuyOffers(nftId: string, options?: Ledger & Pagination): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('nft_buy_offers', generateXrpParams({ nftId }, options)),
      )
      .then((r) => r.result)
  }

  nftSellOffers(nftId: string, options?: Ledger & Pagination): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('nft_sell_offers', generateXrpParams({ nftId }, options)),
      )
      .then((r) => r.result)
  }

  ripplePathFind(
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    options?: RipplePathFindOptions,
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
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
      .then((r) => r.result)
  }

  channelAuthorize(amount: string, channelId: string, options?: Secrets): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
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
      .then((r) => r.result)
  }

  channelVerify(amount: string, channelId: string, publicKey: string, signature: string): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('channel_verify', generateXrpParams({ amount, channelId, publicKey, signature })),
      )
      .then((r) => r.result)
  }

  fee(): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('fee'))
      .then((r) => r.result)
  }

  serverInfo(): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('server_info', generateXrpParams()))
      .then((r) => r.result)
  }

  serverState(): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('server_state'))
      .then((r) => r.result)
  }

  manifest(publicKey: string): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('manifest', generateXrpParams({ publicKey })),
      )
      .then((r) => r.result)
  }

  ping(): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('ping'))
      .then((r) => r.result)
  }

  random(): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('random'))
      .then((r) => r.result)
  }
}
