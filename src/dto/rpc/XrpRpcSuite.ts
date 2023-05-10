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

export interface XrpResult {
  status: string
  [key: string]: any
}

export interface XrpRpcSuite extends AbstractJsonRpcSuite {
  // account methods
  accountChannels(
    account: string,
    options?: {
      destinationAccount?: string
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult>

  accountCurrencies(
    account: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      strict?: boolean
    },
  ): Promise<XrpResult>

  accountInfo(
    account: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      queue?: boolean
      signerLists?: boolean
      strict?: boolean
    },
  ): Promise<XrpResult>

  accountLines(
    account: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      peer?: string
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult>

  accountNfts(
    account: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult>

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
  ): Promise<XrpResult>

  accountOffers(
    account: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
      strict?: boolean
    },
  ): Promise<XrpResult>

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
  ): Promise<XrpResult>

  gatewayBalances(
    account: string,
    options?: {
      strict?: boolean
      hotwallet?: string | string[]
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
    },
  ): Promise<XrpResult>

  norippleCheck(
    account: string,
    role: string,
    options?: {
      transactions?: boolean
      limit?: number
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
    },
  ): Promise<XrpResult>

  // ledger methods
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
  }): Promise<XrpResult>

  ledgerClosed(): Promise<XrpResult>

  ledgerCurrent(): Promise<XrpResult>

  ledgerData(options?: {
    ledgerHash?: string
    ledgerIndex?: LedgerIndex
    binary?: boolean
    limit?: number
    marker?: unknown
    type?: string
  }): Promise<XrpResult>

  ledgerEntry(options?: {
    binary?: boolean
    ledgerHash?: string
    ledgerIndex?: LedgerIndex
    index?: string
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
  }): Promise<XrpResult>

  // transaction methods
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
  ): Promise<XrpResult>

  submitMultisigned(
    txJson: Record<string, unknown>,
    options?: {
      failHard?: boolean
    },
  ): Promise<XrpResult>

  transactionEntry(
    txHash: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
    },
  ): Promise<XrpResult>

  tx(
    transaction: string,
    options?: {
      binary?: boolean
      minLedger?: number
      maxLedger?: number
    },
  ): Promise<XrpResult>

  txHistory(start: number): Promise<XrpResult>

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
  ): Promise<XrpResult>

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
  ): Promise<XrpResult>

  // path and order book methods
  bookOffers(
    takerGets: Record<string, unknown>,
    takerPays: Record<string, unknown>,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      taker?: string
    },
  ): Promise<XrpResult>

  depositAuthorized(
    sourceAccount: string,
    destinationAccount: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
    },
  ): Promise<XrpResult>

  nftBuyOffers(
    nftId: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult>

  nftSellOffers(
    nftId: string,
    options?: {
      ledgerHash?: string
      ledgerIndex?: LedgerIndex
      limit?: number
      marker?: unknown
    },
  ): Promise<XrpResult>

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
  ): Promise<XrpResult>

  // payment channel methods
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
  ): Promise<XrpResult>

  channelVerify(amount: string, channelId: string, publicKey: string, signature: string): Promise<XrpResult>

  // server info methods
  fee(): Promise<XrpResult>

  serverInfo(): Promise<XrpResult>

  serverState(): Promise<XrpResult>

  manifest(publicKey: string): Promise<XrpResult>

  // utility methods
  ping(): Promise<XrpResult>

  random(): Promise<XrpResult>
}
