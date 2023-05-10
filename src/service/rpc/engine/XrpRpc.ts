/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import {
  Book,
  Currency,
  CurrencyAmount,
  JsonRpcResponse,
  LedgerIndex,
  OrderBook,
  XrpResult,
  XrpRpcSuite,
} from '../../../dto'
import { CONFIG, Utils } from '../../../util'
import { AbstractJsonRpc } from './AbstractJsonRpc'

const generateXrpParams = (required?: Record<string, unknown>, optional?: Record<string, unknown>) => {
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

  accountChannels(
    account: string,
    options?: {
      destinationAccount?: string
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult> {
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

  accountCurrencies(
    account: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      strict?: boolean
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_currencies', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  accountInfo(
    account: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      queue?: boolean
      signerLists?: boolean
      strict?: boolean
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_info', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  accountLines(
    account: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      peer?: string
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_lines', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  accountNfts(
    account: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_nfts', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  accountObjects(
    account: string,
    options?: {
      deletionBlockersOnly?: boolean
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
      type?: string
    },
  ): Promise<XrpResult> {
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

  accountOffers(
    account: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
      strict?: boolean
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_offers', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  accountTx(
    account: string,
    options?: {
      ledgerIndexMin?: number
      ledgerIndexMax?: number
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      binary?: boolean
      forward?: boolean
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult> {
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

  gatewayBalances(
    account: string,
    options?: {
      strict?: boolean
      hotwallet?: string | string[]
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('gateway_balances', generateXrpParams({ account }, options)),
      )
      .then((r) => r.result)
  }

  norippleCheck(
    account: string,
    role: string,
    options?: {
      transactions?: boolean
      limit?: number
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('noripple_check', generateXrpParams({ account, role }, options)),
      )
      .then((r) => r.result)
  }

  ledger(options?: {
    ledgerHash?: string
    ledgerIndex?: LedgerIndex
    full?: boolean
    accounts?: boolean
    transactions?: boolean
    expand?: boolean
    ownerFunds?: boolean
    binary?: boolean
    queue?: boolean
    type?: string
    diff?: boolean
  }): Promise<XrpResult> {
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

  ledgerData(options?: {
    ledgerHash?: string
    ledgerIndex?: LedgerIndex
    binary?: boolean
    limit?: number
    marker?: unknown
    type?: string
  }): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('ledger_data', generateXrpParams({}, options)),
      )
      .then((r) => r.result)
  }

  ledgerEntry(options?: {
    binary?: boolean
    ledgerHash?: string
    ledgerIndex?: LedgerIndex
    index?: number
    accountRoot?: string
    directory?: string | Record<string, unknown>
    offer?: string | Record<string, unknown>
    rippleState?: string | Record<string, unknown>
    check?: string
    escrow?: string | Record<string, unknown>
    paymentChannel?: string
    depositPreauth?: string | Record<string, unknown>
    ticket?: string | Record<string, unknown>
    nftPage?: string
  }): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('ledger_entry', generateXrpParams({}, options)),
      )
      .then((r) => r.result)
  }

  submit(
    tx: string | Record<string, unknown>,
    options?: {
      secret?: string
      seed?: string
      seedHex?: string
      passphrase?: string
      keyType?: string
      failHard?: boolean
      offline?: boolean
      buildPath?: boolean
      feeMultMax?: number
      feeDivMax?: number
    },
  ): Promise<XrpResult> {
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

  submitMultisigned(txJson: Record<string, unknown>, options?: { failHard?: boolean }): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('submit_multisigned', generateXrpParams({ txJson }, options)),
      )
      .then((r) => r.result)
  }

  transactionEntry(
    txHash: string,
    options?: { ledgerHash?: string; ledgerIndex?: LedgerIndex },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('transaction_entry', generateXrpParams({ txHash }, options)),
      )
      .then((r) => r.result)
  }

  tx(
    transaction: string,
    options?: { binary?: boolean; minLedger?: number; maxLedger?: number },
  ): Promise<XrpResult> {
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

  sign(
    txJson: Record<string, unknown>,
    options?: {
      secret?: string
      seed?: string
      seedHex?: string
      passphrase?: string
      keyType?: string
      offline?: boolean
      buildPath?: boolean
      feeMultMax?: number
      feeDivMax?: number
    },
  ): Promise<XrpResult> {
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

  signFor(
    account: string,
    txJson: Record<string, unknown>,
    options?: {
      secret?: string
      seed?: string
      seedHex?: string
      passphrase?: string
      keyType?: string
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('sign_for', generateXrpParams({ account, txJson }, options)),
      )
      .then((r) => r.result)
  }

  bookOffers(
    takerGets: Record<string, unknown>,
    takerPays: Record<string, unknown>,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      taker?: string
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('book_offers', generateXrpParams({ takerGets, takerPays }, options)),
      )
      .then((r) => r.result)
  }

  depositAuthorized(
    sourceAccount: string,
    destinationAccount: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
    },
  ): Promise<XrpResult> {
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

  nftBuyOffers(
    nftId: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('nft_buy_offers', generateXrpParams({ nftId }, options)),
      )
      .then((r) => r.result)
  }

  nftSellOffers(
    nftId: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult> {
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
    options?: {
      sendMax?: CurrencyAmount
      paths?: Record<string, unknown>[]
      sourceCurrencies?: Currency[]
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
    },
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

  channelAuthorize(
    amount: string,
    channelId: string,
    options?: {
      secret?: string
      seed?: string
      seedHex?: string
      passphrase?: string
      keyType?: string
    },
  ): Promise<XrpResult> {
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

  subscribe(options?: {
    streams?: string[]
    accounts?: string[]
    accountsProposed?: string[]
    books?: OrderBook[]
    url?: string
    urlUsername?: string
    urlPassword?: string
  }): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('subscribe', generateXrpParams({}, options)),
      )
      .then((r) => r.result)
  }

  unsubscribe(options?: {
    streams?: string[]
    accounts?: string[]
    accountsProposed?: string[]
    books?: Book[]
  }): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('unsubscribe', generateXrpParams({}, options)),
      )
      .then((r) => r.result)
  }

  fee(): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('fee'))
      .then((r) => r.result)
  }

  serverInfo(publicKey: string): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('server_info', generateXrpParams({ publicKey })),
      )
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

  nftHistory(
    nftId: string,
    options?: {
      ledgerIndexMin?: number
      ledgerIndexMax?: number
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      binary?: boolean
      forward?: boolean
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'nft_history',
          generateXrpParams(
            {
              nftId,
            },
            options,
          ),
        ),
      )
      .then((r) => r.result)
  }

  nftInfo(nftId: string, options?: { ledgerHash?: string; ledgerIndex?: LedgerIndex }): Promise<XrpResult> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('nft_info', generateXrpParams({ nftId }, options)),
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
