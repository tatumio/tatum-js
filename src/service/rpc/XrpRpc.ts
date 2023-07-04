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
} from '../../dto'
import { ResponseDto, ResponseUtils, Utils } from '../../util'
import { AbstractBatchRpc } from './generic'

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

  accountChannels(account: string, options?: AccountChannelsOptions): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
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
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  accountCurrencies(account: string, options?: Ledger & StrictOption): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('account_currencies', generateXrpParams({ account }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  accountInfo(account: string, options?: AccountInfoOptions): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('account_info', generateXrpParams({ account }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  accountLines(account: string, options?: AccountLinesOptions): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('account_lines', generateXrpParams({ account }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  accountNfts(account: string, options?: Ledger & Pagination): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('account_nfts', generateXrpParams({ account }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  accountObjects(account: string, options?: AccountObjectsOptions): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
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
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  accountOffers(account: string, options?: Ledger & Pagination & StrictOption): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('account_offers', generateXrpParams({ account }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  accountTx(account: string, options?: AccountTxOptions): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
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
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  gatewayBalances(account: string, options?: GatewayBalancesOptions): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('gateway_balances', generateXrpParams({ account }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  norippleCheck(account: string, role: string, options?: NorippleCheckOptions): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('noripple_check', generateXrpParams({ account, role }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  ledger(options?: LedgerOptions): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('ledger', generateXrpParams({}, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  ledgerClosed(): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('ledger_closed'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  ledgerCurrent(): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('ledger_current'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  ledgerData(options?: Ledger & LedgerBinaryOption & Pagination & TypeOption): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('ledger_data', generateXrpParams({}, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  ledgerEntry(options?: LedgerEntryOptions): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('ledger_entry', generateXrpParams({}, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  submit(tx: Transaction, options?: Secrets & FailOption & AutoFilling): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall(
          'submit',
          generateXrpParams(typeof tx === 'string' ? { txBlob: tx } : { txJson: tx }, options),
        ),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  submitMultisigned(txJson: TxJson, options?: FailOption): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('submit_multisigned', generateXrpParams({ txJson }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  transactionEntry(txHash: string, options?: Ledger): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('transaction_entry', generateXrpParams({ txHash }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  tx(transaction: string, options?: TxOptions): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('tx', generateXrpParams({ transaction }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  txHistory(start: number): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('txHistory', generateXrpParams({ start })),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  sign(txJson: TxJson, options?: Secrets & AutoFilling): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
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
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  signFor(account: string, txJson: TxJson, options?: Secrets): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('sign_for', generateXrpParams({ account, txJson }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  bookOffers(
    takerGets: Currency,
    takerPays: Currency,
    options?: BookOffersOptions,
  ): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('book_offers', generateXrpParams({ takerGets, takerPays }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  depositAuthorized(
    sourceAccount: string,
    destinationAccount: string,
    options?: Ledger,
  ): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
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
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  nftBuyOffers(nftId: string, options?: Ledger & Pagination): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('nft_buy_offers', generateXrpParams({ nftId }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  nftSellOffers(nftId: string, options?: Ledger & Pagination): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('nft_sell_offers', generateXrpParams({ nftId }, options)),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  ripplePathFind(
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    options?: RipplePathFindOptions,
  ): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
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
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  channelAuthorize(amount: string, channelId: string, options?: Secrets): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
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
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  channelVerify(
    amount: string,
    channelId: string,
    publicKey: string,
    signature: string,
  ): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall(
          'channel_verify',
          generateXrpParams({ amount, channelId, publicKey, signature }),
        ),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  fee(): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('fee'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  serverInfo(): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('server_info', generateXrpParams()),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  serverState(): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('server_state'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  manifest(publicKey: string): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('manifest', generateXrpParams({ publicKey })),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  ping(): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('ping'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  random(): Promise<ResponseDto<any>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('random'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
}
