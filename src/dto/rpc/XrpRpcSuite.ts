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

export interface XrpRpcSuite extends AbstractJsonRpcSuite {
  // account methods
  accountChannels(
    account: string,
    destinationAccount?: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
  ): Promise<any>

  accountCurrencies(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    strict?: boolean,
  ): Promise<any>

  accountInfo(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    queue?: boolean,
    signerLists?: boolean,
    strict?: boolean,
  ): Promise<any>

  accountLines(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    peer?: string,
    limit?: number,
    marker?: any,
  ): Promise<any>

  accountNfts(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
  ): Promise<any>

  accountObjects(
    account: string,
    deletionBlockersOnly?: boolean,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
    type?: string,
  ): Promise<any>

  accountOffers(
    account: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
    strict?: boolean,
  ): Promise<any>

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
  ): Promise<any>

  gatewayBalances(
    account: string,
    strict?: boolean,
    hotwallet?: string | string[],
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<any>

  norippleCheck(
    account: string,
    role: string,
    transactions?: boolean,
    limit?: number,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<any>

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
  ): Promise<any>

  ledgerClosed(): Promise<{ ledger_hash: string; ledger_index: number }>

  ledgerCurrent(): Promise<number>

  ledgerData(
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    binary?: boolean,
    limit?: number,
    marker?: any,
    type?: string,
  ): Promise<any>

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
  ): Promise<any>

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
  ): Promise<any>

  submitMultisigned(txJson: Record<string, unknown>, failHard?: boolean): Promise<any>

  transactionEntry(txHash: string, ledgerHash?: string, ledgerIndex?: LedgerIndex): Promise<any>

  tx(transaction: string, binary?: boolean, minLedger?: number, maxLedger?: number): Promise<any>

  txHistory(start: number): Promise<any>

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
  ): Promise<any>

  signFor(
    account: string,
    txJson: Record<string, unknown>,
    secret?: string,
    seed?: string,
    seedHex?: string,
    passphrase?: string,
    keyType?: string,
  ): Promise<any>

  // path and order book methods
  bookOffers(
    takerGets: Record<string, unknown>,
    takerPays: Record<string, unknown>,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    taker?: string,
  ): Promise<any>

  depositAuthorized(
    sourceAccount: string,
    destinationAccount: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<any>

  nftBuyOffers(
    nftId: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
  ): Promise<any>

  nftSellOffers(
    nftId: string,
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
    limit?: number,
    marker?: any,
  ): Promise<any>

  pathFind(
    subcommand: string,
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    sendMax?: CurrencyAmount,
    paths?: Record<string, unknown>[],
  ): Promise<any>

  ripplePathFind(
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    sendMax?: CurrencyAmount,
    paths?: Record<string, unknown>[],
    sourceCurrencies?: Currency[],
    ledgerHash?: string,
    ledgerIndex?: LedgerIndex,
  ): Promise<any>

  // payment channel methods
  channelAuthorize(
    amount: string,
    channelId: string,
    secret?: string,
    seed?: string,
    seedHex?: string,
    passphrase?: string,
    keyType?: string,
  ): Promise<string>

  channelVerify(amount: string, channelId: string, publicKey: string, signature: string): Promise<boolean>

  // subscription methods
  subscribe(
    streams?: string[],
    accounts?: string[],
    accountsProposed?: string[],
    books?: OrderBook[],
    url?: string,
    urlUsername?: string,
    urlPassword?: string,
  ): Promise<any>

  unsubscribe(
    streams?: string[],
    accounts?: string[],
    accountsProposed?: string[],
    books?: Book[],
  ): Promise<string>

  // server info methods
  fee(): Promise<any>

  serverInfo(publicKey: string): Promise<any>

  serverState(): Promise<any>

  manifest(publicKey: string): Promise<any>

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
    marker?: any,
  ): Promise<any>

  nftInfo(nftId: string, ledgerHash?: string, ledgerIndex?: LedgerIndex): Promise<any>

  // utility methods
  ping(): Promise<string>

  random(): Promise<string>
}
