/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractJsonRpcSuite } from './AbstractJsonRpcSuite'

/**
 * XRP RPC calls.
 */

export type LedgerIndex = 'validated' | 'closed' | 'current' | number

export type Role = 'gateway' | 'user'

export type TxJson = Record<string, unknown>

export type Transaction =
  // hex representation of the signed transaction to submit or Transaction definition in JSON format
  string | TxJson

export interface Currency {
  // arbitrary currency code for the token
  currency: string

  // account that issues this token
  issuer?: string
}

export interface CurrencyWithValue extends Currency {
  // quoted decimal representation of the amount of the token
  value: string
}

export type CurrencyAmount = string | CurrencyWithValue

export interface Pagination {
  // limit the number of results to retrieve
  limit?: number

  // value from a previous paginated response (different servers and methods can have different definitions)
  marker?: unknown
}

export interface Ledger {
  // 20-byte hex string for the ledger version to use
  ledgerHash?: string

  // sequence number of the ledger to use, or a shortcut string to choose a ledger automatically
  ledgerIndex?: LedgerIndex
}

export interface QueueOption {
  // if true, includes information about queued transactions in the results
  queue?: boolean
}

export interface StrictOption {
  // if true, only accept an address or public key
  strict?: boolean
}

export interface TypeOption {
  // filter results by a ledger entry type
  type?: string
}

export interface LedgerBinaryOption {
  // if true, return the requested ledger object's contents as a hex string in the XRP Ledger's binary format
  binary?: boolean
}

export interface FailOption {
  // if true, and the transaction fails locally, do not retry or relay the transaction to other servers
  failHard?: boolean
}

export interface Secrets {
  // the secret seed of the account
  secret?: string

  // the secret seed of the account in the XRP Ledger's base58 format
  seed?: string

  // the secret seed of the account in the hexadecimal format
  seedHex?: string

  // the secret seed of the account as the string passphrase
  passphrase?: string

  // the signing algorithm of the cryptographic key pair provided (secp256k1 or ed25519)
  keyType?: string
}

export interface AutoFilling {
  // if true, when constructing the transaction, do not try to automatically fill in or validate values
  offline?: boolean

  // if true, the server auto-fills the Paths field of a Payment transaction before signing
  buildPath?: boolean

  // sign-and-submit fails with the error rpcHIGH_FEE if the auto-filled Fee value would be greater than the reference transaction cost × feeMultMax ÷ feeDivMax
  feeMultMax?: number
  feeDivMax?: number
}

export type AccountChannelsOptions = Ledger &
  Pagination & {
    // unique identifier of the destination account
    destinationAccount?: string
  }

export type AccountInfoOptions = Ledger &
  QueueOption &
  StrictOption & {
    // if true, and the MultiSign amendment is enabled, also returns signer lists associated with this account
    signerLists?: boolean
  }

export type AccountLinesOptions = Ledger &
  Pagination & {
    // address of a second account (if provided, show only lines of trust connecting the two accounts)
    peer?: string
  }

export type AccountObjectsOptions = Ledger &
  Pagination &
  TypeOption & {
    // if true, the response only includes objects that would block this account from being deleted
    deletionBlockersOnly?: boolean
  }

export type AccountTxOptions = Ledger &
  Pagination & {
    // use to specify the earliest ledger to include transactions from (-1 is earliest)
    ledgerIndexMin?: number

    // use to specify the most recent ledger to include transactions from (-1 is latest)
    ledgerIndexMax?: number

    // if set to true, returns transactions as hex strings instead of JSON
    binary?: boolean

    // if set to true, returns values indexed with the oldest ledger first (otherwise, the results are indexed with the newest ledger first)
    forward?: boolean
  }

export type GatewayBalancesOptions = Ledger &
  StrictOption & {
    // an operational address to exclude from the balances issued, or an array of such addresses
    hotwallet?: string | string[]
  }

export type NorippleCheckOptions = Ledger & {
  // if true, include an array of suggested transactions, as JSON objects, that you can sign and submit to fix the problems
  transactions?: boolean

  // the maximum number of trust line problems to include in the results (defaults to 300)
  limit?: number
}

export type LedgerOptions = Ledger &
  LedgerBinaryOption &
  QueueOption &
  TypeOption & {
    // if true, return full information on the entire ledger (admin only, ignored without ledger version)
    full?: boolean

    // if true, return the ledger's entire state data (admin only, ignored without ledger version)
    accounts?: boolean

    // if true, return information on transactions in the specified ledger version (ignored without ledger version)
    transactions?: boolean

    // provide full JSON-formatted information for transaction/account information instead of only hashes
    expand?: boolean

    // if true, include owner_funds field in the metadata of OfferCreate transactions in the response
    ownerFunds?: boolean
  }

export type LedgerEntryOptions = Ledger &
  LedgerBinaryOption & {
    // the object ID of a single object to retrieve from the ledger, as a 64-character (256-bit) hexadecimal string
    index?: string

    // the classic address of the AccountRoot object to retrieve
    accountRoot?: string

    // if a string, must be the object ID of the directory, as hexadecimal, and if an object, requires either dir_root or owner as a sub-field, plus optionally a sub_index sub-field
    directory?: string | Record<string, string | number>

    // if a string, interpret as the unique object ID to the Offer, and if an object, requires the sub-fields account and seq to uniquely identify the offer
    offer?: string | Record<string, string | number>

    // object specifying the RippleState (trust line) object to retrieve, with the accounts and currency sub-fields required
    rippleState?: Record<string, string | string[]>

    // the object ID of a Check object to retrieve
    check?: string

    // if a string, must be the object ID of the Escrow, as hexadecimal, and if an object, requires owner and seq sub-fields
    escrow?: string | Record<string, string | number>

    // the object ID of a PayChannel object to retrieve
    paymentChannel?: string

    // if a string, must be the object ID of the DepositPreauth object, as hexadecimal, and if an object, requires owner and authorized sub-fields
    depositPreauth?: string | Record<string, string>

    // if a string, must be the object ID of the Ticket, as hexadecimal, and if an object, the account and ticket_seq sub-fields are required
    ticket?: string | Record<string, string | number>

    // the object ID of an NFT Page to retrieve
    nftPage?: string
  }

export type TxOptions = {
  // if true, return transaction data and metadata as binary serialized to hexadecimal strings
  binary?: boolean

  // use this with maxLedger to specify a range of up to 1000 ledger indexes, starting with this ledger (inclusive)
  minLedger?: number

  // use this with minLedger to specify a range of up to 1000 ledger indexes, starting with this ledger (inclusive)
  maxLedger?: number
}

export type BookOffersOptions = Ledger &
  Pagination & {
    // the Address of an account to use as a perspective (the response includes this account's Offers even if they are unfunded)
    taker?: string
  }

export type RipplePathFindOptions = Ledger & {
  // currency amount that would be spent in the transaction
  sendMax?: CurrencyAmount

  // array of currencies that the source account might want to spend
  sourceCurrencies?: Currency[]
}

export interface XrpResult {
  // success indicates the request was successfully received and understood by the server
  status: string

  // response data received by the server
  [key: string]: any
}

export interface XrpRpcSuite extends AbstractJsonRpcSuite {
  // account methods
  accountChannels(account: string, options?: AccountChannelsOptions): Promise<XrpResult>

  accountCurrencies(account: string, options?: Ledger & StrictOption): Promise<XrpResult>

  accountInfo(account: string, options?: AccountInfoOptions): Promise<XrpResult>

  accountLines(account: string, options?: AccountLinesOptions): Promise<XrpResult>

  accountNfts(account: string, options?: Ledger & Pagination): Promise<XrpResult>

  accountObjects(account: string, options?: AccountObjectsOptions): Promise<XrpResult>

  accountOffers(account: string, options?: Ledger & Pagination & StrictOption): Promise<XrpResult>

  accountTx(account: string, options?: AccountTxOptions): Promise<XrpResult>

  gatewayBalances(account: string, options?: GatewayBalancesOptions): Promise<XrpResult>

  norippleCheck(account: string, role: Role, options?: NorippleCheckOptions): Promise<XrpResult>

  // ledger methods
  ledger(options?: LedgerOptions): Promise<XrpResult>

  ledgerClosed(): Promise<XrpResult>

  ledgerCurrent(): Promise<XrpResult>

  ledgerData(options?: Ledger & LedgerBinaryOption & Pagination & TypeOption): Promise<XrpResult>

  ledgerEntry(options?: LedgerEntryOptions): Promise<XrpResult>

  // transaction methods
  submit(tx: Transaction, options?: Secrets & FailOption & AutoFilling): Promise<XrpResult>

  submitMultisigned(txJson: TxJson, options?: FailOption): Promise<XrpResult>

  transactionEntry(txHash: string, options?: Ledger): Promise<XrpResult>

  tx(transaction: string, options?: TxOptions): Promise<XrpResult>

  txHistory(start: number): Promise<XrpResult>

  sign(txJson: TxJson, options?: Secrets & AutoFilling): Promise<XrpResult>

  signFor(account: string, txJson: TxJson, options?: Secrets): Promise<XrpResult>

  // path and order book methods
  bookOffers(takerGets: Currency, takerPays: Currency, options?: BookOffersOptions): Promise<XrpResult>

  depositAuthorized(sourceAccount: string, destinationAccount: string, options?: Ledger): Promise<XrpResult>

  nftBuyOffers(nftId: string, options?: Ledger & Pagination): Promise<XrpResult>

  nftSellOffers(nftId: string, options?: Ledger & Pagination): Promise<XrpResult>

  ripplePathFind(
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    options?: RipplePathFindOptions,
  ): Promise<XrpResult>

  // payment channel methods
  channelAuthorize(amount: string, channelId: string, options?: Secrets): Promise<XrpResult>

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
