/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractJsonRpcSuite } from './AbstractJsonRpcSuite'

/**
 * XRP RPC calls.
 */

export type LedgerIndex = 'validated' | 'closed' | 'current' | number

export interface Currency {
  currency: string
  issuer?: string
}

export interface CurrencyWithValue extends Currency {
  value: string
}

export type CurrencyAmount = string | CurrencyWithValue

export interface Book {
  taker_gets?: Record<string, unknown>
  taker_pays?: Record<string, unknown>
  both?: boolean
}

export interface OrderBook extends Book {
  taker: string
  snapshot?: boolean
}

export interface XrpResult {
  status: string
  [key: string]: any
}

export interface XrpRpcSuite extends AbstractJsonRpcSuite {
  // account methods
  accountChannels(
    account: string,
    destinationAccount?: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: unknown,
  ): Promise<XrpResult>

  accountCurrencies(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    strict?: boolean,
  ): Promise<XrpResult>

  accountInfo(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    queue?: boolean,
    signerLists?: boolean,
    strict?: boolean,
  ): Promise<XrpResult>

  accountLines(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    peer?: string,
    limit?: number,
    marker?: unknown,
  ): Promise<XrpResult>

  accountNfts(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: unknown,
  ): Promise<XrpResult>

  accountObjects(
    account: string,
    deletionBlockersOnly?: boolean,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: unknown,
    type?: string,
  ): Promise<XrpResult>

  accountOffers(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: unknown,
    strict?: boolean,
  ): Promise<XrpResult>

  accountTx(
    account: string,
    ledgerIndexMin?: number,
    ledgerIndexMax?: number,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    binary?: boolean,
    forward?: boolean,
    limit?: number,
    marker?: unknown,
  ): Promise<XrpResult>

  gatewayBalances(
    account: string,
    strict?: boolean,
    hotwallet?: string | string[],
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<XrpResult>

  norippleCheck(
    account: string,
    role: string,
    transactions?: boolean,
    limit?: number,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<XrpResult>

  // ledger methods
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
  ): Promise<XrpResult>

  ledgerClosed(): Promise<XrpResult>

  ledgerCurrent(): Promise<XrpResult>

  ledgerData(
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    binary?: boolean,
    limit?: number,
    marker?: unknown,
    type?: string,
  ): Promise<XrpResult>

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
  ): Promise<XrpResult>

  // transaction methods
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
  ): Promise<XrpResult>

  submitMultisigned(txJson: Record<string, unknown>, failHard?: boolean): Promise<XrpResult>

  transactionEntry(txHash: string, ledgerHash?: string, ledgerIndex?: LedgerIndex): Promise<XrpResult>

  tx(transaction: string, binary?: boolean, minLedger?: number, maxLedger?: number): Promise<XrpResult>

  txHistory(start: number): Promise<XrpResult>

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
  ): Promise<XrpResult>

  signFor(
    account: string,
    txJson: Record<string, unknown>,
    secret?: string,
    seed?: string,
    seedHex?: string,
    passphrase?: string,
    keyType?: string,
  ): Promise<XrpResult>

  // path and order book methods
  bookOffers(
    takerGets: Record<string, unknown>,
    takerPays: Record<string, unknown>,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    taker?: string,
  ): Promise<XrpResult>

  depositAuthorized(
    sourceAccount: string,
    destinationAccount: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<XrpResult>

  nftBuyOffers(
    nftId: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: unknown,
  ): Promise<XrpResult>

  nftSellOffers(
    nftId: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: unknown,
  ): Promise<XrpResult>

  pathFind(
    subcommand: string,
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    sendMax?: CurrencyAmount,
    paths?: Record<string, unknown>[],
  ): Promise<XrpResult>

  ripplePathFind(
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    sendMax?: CurrencyAmount,
    paths?: Record<string, unknown>[],
    sourceCurrencies?: Currency[],
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<XrpResult>

  // payment channel methods
  channelAuthorize(
    amount: string,
    channelId: string,
    secret?: string,
    seed?: string,
    seedHex?: string,
    passphrase?: string,
    keyType?: string,
  ): Promise<XrpResult>

  channelVerify(amount: string, channelId: string, publicKey: string, signature: string): Promise<XrpResult>

  // subscription methods
  subscribe(
    streams?: string[],
    accounts?: string[],
    accountsProposed?: string[],
    books?: OrderBook[],
    url?: string,
    urlUsername?: string,
    urlPassword?: string,
  ): Promise<XrpResult>

  unsubscribe(
    streams?: string[],
    accounts?: string[],
    accountsProposed?: string[],
    books?: Book[],
  ): Promise<XrpResult>

  // server info methods
  fee(): Promise<XrpResult>

  serverInfo(publicKey: string): Promise<XrpResult>

  serverState(): Promise<XrpResult>

  manifest(publicKey: string): Promise<XrpResult>

  // clio specific methods
  nftHistory(
    nftId: string,
    ledgerIndexMin?: number,
    ledgerIndexMax?: number,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    binary?: boolean,
    forward?: boolean,
    limit?: number,
    marker?: unknown,
  ): Promise<XrpResult>

  nftInfo(nftId: string, ledgerHash?: string, ledgerIndex?: LedgerIndex): Promise<XrpResult>

  // utility methods
  ping(): Promise<XrpResult>

  random(): Promise<XrpResult>
}
