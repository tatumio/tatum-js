/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import {
  Book,
  Currency,
  CurrencyAmount,
  JsonRpcResponse,
  LedgerIndex,
  OrderBook,
  XrpRpcSuite,
} from '../../../dto'
import { CONFIG } from '../../../util'
import { AbstractJsonRpc } from './AbstractJsonRpc'

const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

const generateXrpParams = (params: Record<string, unknown>) => {
  const xrpParams: { [name: string]: unknown } = {}
  for (const [name, value] of Object.entries(params)) {
    xrpParams[camelToSnakeCase(name)] = value
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
    destinationAccount?: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_channels',
          generateXrpParams({
            account,
            destinationAccount,
            ledgerHash,
            ledgerIndex,
            limit,
            marker,
          }),
        ),
      )
      .then((r) => r.result)
  }

  accountCurrencies(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    strict?: boolean,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_currencies',
          generateXrpParams({ account, ledgerHash, ledgerIndex, strict }),
        ),
      )
      .then((r) => r.result)
  }

  accountInfo(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    queue?: boolean,
    signerLists?: boolean,
    strict?: boolean,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_info',
          generateXrpParams({ account, ledgerHash, ledgerIndex, queue, signerLists, strict }),
        ),
      )
      .then((r) => r.result)
  }

  accountLines(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    peer?: string,
    limit?: number,
    marker?: any,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_lines',
          generateXrpParams({ account, ledgerHash, ledgerIndex, peer, limit, marker }),
        ),
      )
      .then((r) => r.result)
  }

  accountNfts(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_nfts',
          generateXrpParams({ account, ledgerHash, ledgerIndex, limit, marker }),
        ),
      )
      .then((r) => r.result)
  }

  accountObjects(
    account: string,
    deletionBlockersOnly?: boolean,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
    type?: string,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_objects',
          generateXrpParams({
            account,
            deletionBlockersOnly,
            ledgerHash,
            ledgerIndex,
            limit,
            marker,
            type,
          }),
        ),
      )
      .then((r) => r.result)
  }

  accountOffers(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
    strict?: boolean,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_offers',
          generateXrpParams({ account, ledgerHash, ledgerIndex, limit, marker, strict }),
        ),
      )
      .then((r) => r.result)
  }

  accountTx(
    account: string,
    ledgerIndexMin?: number,
    ledgerIndexMax?: number,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    binary?: boolean,
    forward?: boolean,
    limit?: number,
    marker?: any,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'account_tx',
          generateXrpParams({
            account,
            ledgerIndexMin,
            ledgerIndexMax,
            ledgerHash,
            ledgerIndex,
            binary,
            forward,
            limit,
            marker,
          }),
        ),
      )
      .then((r) => r.result)
  }

  gatewayBalances(
    account: string,
    strict?: boolean,
    hotwallet?: string | string[],
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'gateway_balances',
          generateXrpParams({ account, strict, hotwallet, ledgerHash, ledgerIndex }),
        ),
      )
      .then((r) => r.result)
  }

  norippleCheck(
    account: string,
    role: string,
    transactions?: boolean,
    limit?: number,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'noripple_check',
          generateXrpParams({ account, role, transactions, limit, ledgerHash, ledgerIndex }),
        ),
      )
      .then((r) => r.result)
  }

  ledger(
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    full?: boolean,
    accounts?: boolean,
    transactions?: boolean,
    expand?: boolean,
    ownerFunds?: boolean,
    binary?: boolean,
    queue?: boolean,
    type?: string,
    diff?: boolean,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'ledger',
          generateXrpParams({
            ledgerHash,
            ledgerIndex,
            full,
            accounts,
            transactions,
            expand,
            ownerFunds,
            binary,
            queue,
            type,
            diff,
          }),
        ),
      )
      .then((r) => r.result)
  }

  ledgerClosed(): Promise<{ ledger_hash: string; ledger_index: number }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('ledger_closed'))
      .then((r) => ({ ledger_hash: r.result.ledger_hash, ledger_index: r.result.ledger_index }))
  }

  ledgerCurrent(): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('ledger_current'))
      .then((r) => r.result.ledger_current_index)
  }

  ledgerData(
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    binary?: boolean,
    limit?: number,
    marker?: any,
    type?: string,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'ledger_data',
          generateXrpParams({ ledgerHash, ledgerIndex, binary, limit, marker, type }),
        ),
      )
      .then((r) => r.result)
  }

  ledgerEntry(
    binary?: boolean,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    index?: number,
    accountRoot?: string,
    directory?: string | Record<string, unknown>,
    offer?: string | Record<string, unknown>,
    rippleState?: string | Record<string, unknown>,
    check?: string,
    escrow?: string | Record<string, unknown>,
    paymentChannel?: string,
    depositPreauth?: string | Record<string, unknown>,
    ticket?: string | Record<string, unknown>,
    nftPage?: string,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'ledger_entry',
          generateXrpParams({
            binary,
            ledgerHash,
            ledgerIndex,
            index,
            accountRoot,
            directory,
            offer,
            rippleState,
            check,
            escrow,
            paymentChannel,
            depositPreauth,
            ticket,
            nftPage,
          }),
        ),
      )
      .then((r) => r.result)
  }

  submit(
    txBlob?: string,
    txJson?: Record<string, unknown>,
    secret?: string,
    seed?: string,
    seedHex?: string,
    passphrase?: string,
    keyType?: string,
    failHard?: boolean,
    offline?: boolean,
    buildPath?: boolean,
    feeMultMax?: number,
    feeDivMax?: number,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'submit',
          generateXrpParams({
            txBlob,
            txJson,
            secret,
            seed,
            seedHex,
            passphrase,
            keyType,
            failHard,
            offline,
            buildPath,
            feeMultMax,
            feeDivMax,
          }),
        ),
      )
      .then((r) => r.result)
  }

  submitMultisigned(txJson: Record<string, unknown>, failHard?: boolean): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('submit_multisigned', generateXrpParams({ txJson, failHard })),
      )
      .then((r) => r.result)
  }

  transactionEntry(txHash: string, ledgerHash?: string, ledgerIndex?: LedgerIndex): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('transaction_entry', generateXrpParams({ txHash, ledgerHash, ledgerIndex })),
      )
      .then((r) => r.result)
  }

  tx(transaction: string, binary?: boolean, minLedger?: number, maxLedger?: number): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('tx', generateXrpParams({ transaction, binary, minLedger, maxLedger })),
      )
      .then((r) => r.result)
  }

  txHistory(start: number): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('txHistory', generateXrpParams({ start })),
      )
      .then((r) => r.result)
  }

  sign(
    txJson: Record<string, unknown>,
    secret?: string,
    seed?: string,
    seedHex?: string,
    passphrase?: string,
    keyType?: string,
    offline?: boolean,
    buildPath?: boolean,
    feeMultMax?: number,
    feeDivMax?: number,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'sign',
          generateXrpParams({
            txJson,
            secret,
            seed,
            seedHex,
            passphrase,
            keyType,
            offline,
            buildPath,
            feeMultMax,
            feeDivMax,
          }),
        ),
      )
      .then((r) => r.result)
  }

  signFor(
    account: string,
    txJson: Record<string, unknown>,
    secret?: string,
    seed?: string,
    seedHex?: string,
    passphrase?: string,
    keyType?: string,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'sign_for',
          generateXrpParams({ account, txJson, secret, seed, seedHex, passphrase, keyType }),
        ),
      )
      .then((r) => r.result)
  }

  bookOffers(
    takerGets: Record<string, unknown>,
    takerPays: Record<string, unknown>,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    taker?: string,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'book_offers',
          generateXrpParams({ takerGets, takerPays, ledgerHash, ledgerIndex, limit, taker }),
        ),
      )
      .then((r) => r.result)
  }

  depositAuthorized(
    sourceAccount: string,
    destinationAccount: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'deposit_authorized',
          generateXrpParams({
            sourceAccount,
            destinationAccount,
            ledgerHash,
            ledgerIndex,
          }),
        ),
      )
      .then((r) => r.result)
  }

  nftBuyOffers(
    nftId: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'nft_buy_offers',
          generateXrpParams({ nftId, ledgerHash, ledgerIndex, limit, marker }),
        ),
      )
      .then((r) => r.result)
  }

  nftSellOffers(
    nftId: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'nft_sell_offers',
          generateXrpParams({ nftId, ledgerHash, ledgerIndex, limit, marker }),
        ),
      )
      .then((r) => r.result)
  }

  pathFind(
    subcommand: string,
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    sendMax?: CurrencyAmount,
    paths?: Record<string, unknown>[],
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'path_find',
          generateXrpParams({
            subcommand,
            sourceAccount,
            destinationAccount,
            destinationAmount,
            sendMax,
            paths,
          }),
        ),
      )
      .then((r) => r.result)
  }

  ripplePathFind(
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    sendMax?: CurrencyAmount,
    paths?: Record<string, unknown>[],
    sourceCurrencies?: Currency[],
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'ripple_path_find',
          generateXrpParams({
            sourceAccount,
            destinationAccount,
            destinationAmount,
            sendMax,
            paths,
            sourceCurrencies,
            ledgerHash,
            ledgerIndex,
          }),
        ),
      )
      .then((r) => r.result)
  }

  channelAuthorize(
    amount: string,
    channelId: string,
    secret?: string,
    seed?: string,
    seedHex?: string,
    passphrase?: string,
    keyType?: string,
  ): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'channel_authorize',
          generateXrpParams({
            amount,
            channelId,
            secret,
            seed,
            seedHex,
            passphrase,
            keyType,
          }),
        ),
      )
      .then((r) => r.result.signature)
  }

  channelVerify(amount: string, channelId: string, publicKey: string, signature: string): Promise<boolean> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('channel_verify', generateXrpParams({ amount, channelId, publicKey, signature })),
      )
      .then((r) => r.result.signature_verified)
  }

  subscribe(
    streams?: string[],
    accounts?: string[],
    accountsProposed?: string[],
    books?: OrderBook[],
    url?: string,
    urlUsername?: string,
    urlPassword?: string,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'subscribe',
          generateXrpParams({
            streams,
            accounts,
            accountsProposed,
            books,
            url,
            urlUsername,
            urlPassword,
          }),
        ),
      )
      .then((r) => r.result)
  }

  unsubscribe(
    streams?: string[],
    accounts?: string[],
    accountsProposed?: string[],
    books?: Book[],
  ): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('unsubscribe', generateXrpParams({ streams, accounts, accountsProposed, books })),
      )
      .then((r) => r.result.status)
  }

  fee(): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('fee'))
      .then((r) => r.result)
  }

  serverInfo(publicKey: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('server_info', generateXrpParams({ publicKey })),
      )
      .then((r) => r.result)
  }

  serverState(): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('server_state'))
      .then((r) => r.result)
  }

  manifest(publicKey: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('manifest', generateXrpParams({ publicKey })),
      )
      .then((r) => r.result)
  }

  nftHistory(
    nftId: string,
    ledgerIndexMin?: number,
    ledgerIndexMax?: number,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    binary?: boolean,
    forward?: boolean,
    limit?: number,
    marker?: any,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall(
          'nft_history',
          generateXrpParams({
            nftId,
            ledgerIndexMin,
            ledgerIndexMax,
            ledgerHash,
            ledgerIndex,
            binary,
            forward,
            limit,
            marker,
          }),
        ),
      )
      .then((r) => r.result)
  }

  nftInfo(nftId: string, ledgerHash?: string, ledgerIndex?: LedgerIndex): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('nft_info', generateXrpParams({ nftId, ledgerHash, ledgerIndex })),
      )
      .then((r) => r.result)
  }

  ping(): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('ping'))
      .then((r) => r.result.status)
  }

  random(): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('random'))
      .then((r) => r.result.random)
  }
}
