/* eslint-disable @typescript-eslint/no-explicit-any */

import { AbstractRpcInterface } from './AbstractJsonRpcInterface'

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

export interface XrpRpcSuite extends XrpRpcInterface, AbstractRpcInterface {}

export interface XrpRpcInterface {
  // account methods

  /**
   * Retrieves channels of a given account.
   * @param account - The account to retrieve channels from.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-account-methods/account_channels
   */
  accountChannels(account: string, options?: AccountChannelsOptions): Promise<any>

  /**
   * Retrieves currencies of a given account.
   * @param account - The account to retrieve currencies from.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-account-methods/account_currencies
   */
  accountCurrencies(account: string, options?: Ledger & StrictOption): Promise<any>

  /**
   * Retrieves information about a given account.
   * @param account - The account to retrieve information about.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-account-methods/account_info
   */
  accountInfo(account: string, options?: AccountInfoOptions): Promise<any>

  /**
   * Retrieves trust lines connected to an account.
   * @param account - The account to retrieve trust lines from.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-account-methods/account_lines
   */
  accountLines(account: string, options?: AccountLinesOptions): Promise<any>

  /**
   * Retrieves non-fungible tokens (NFTs) owned by an account.
   * @param account - The account to retrieve NFTs from.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-account-methods/account_nfts
   */
  accountNfts(account: string, options?: Ledger & Pagination): Promise<any>

  /**
   * Retrieves the objects owned by an account on the ledger.
   * @param account - The account to retrieve ledger objects from.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-account-methods/account_objects
   */
  accountObjects(account: string, options?: AccountObjectsOptions): Promise<any>

  /**
   * Retrieves outstanding offers by a given account.
   * @param account - The account to retrieve offers from.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-account-methods/account_offers
   */
  accountOffers(account: string, options?: Ledger & Pagination & StrictOption): Promise<any>

  /**
   * Retrieves a list of transactions affecting an account.
   * @param account - The account to retrieve transactions from.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-account-methods/account_tx
   */
  accountTx(account: string, options?: AccountTxOptions): Promise<any>

  /**
   * Calculates the total balances issued by an account.
   * @param account - The account to retrieve balances from.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-account-methods/gateway_balances
   */
  gatewayBalances(account: string, options?: GatewayBalancesOptions): Promise<any>

  /**
   * Checks potential issues with an account's NoRipple settings.
   * @param account - The account to check NoRipple settings.
   * @param role - The role of the account ("user", "gateway", or "issuer").
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-account-methods/noripple_check
   */
  norippleCheck(account: string, role: Role, options?: NorippleCheckOptions): Promise<any>

  // ledger methods

  /**
   * Retrieves information about a particular ledger.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-ledger-methods/ledger
   */
  ledger(options?: LedgerOptions): Promise<any>

  /**
   * Retrieves information about the most recently closed ledger.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-ledger-methods/ledger_closed
   */
  ledgerClosed(): Promise<any>

  /**
   * Retrieves information about the current in-progress ledger.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-ledger-methods/ledger_current
   */
  ledgerCurrent(): Promise<any>

  /**
   * Retrieves information about the contents of a ledger.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-ledger-methods/ledger_data
   */
  ledgerData(options?: Ledger & LedgerBinaryOption & Pagination & TypeOption): Promise<any>

  /**
   * Retrieves a specific object from a ledger.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-ledger-methods/ledger_entry
   */
  ledgerEntry(options?: LedgerEntryOptions): Promise<any>

  // transaction methods

  /**
   * Submits a transaction to the XRP Ledger.
   * @param tx - Transaction to submit.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-transaction-methods/submit
   */
  submit(tx: Transaction, options?: Secrets & FailOption & AutoFilling): Promise<any>

  /**
   * Submits a multi-signed transaction to the XRP Ledger.
   * @param txJson - Transaction JSON to submit.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-transaction-methods/submit_multisigned
   */
  submitMultisigned(txJson: TxJson, options?: FailOption): Promise<any>

  /**
   * Retrieves information about a particular transaction by its hash.
   * @param txHash - The transaction hash.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-transaction-methods/transaction_entry
   */
  transactionEntry(txHash: string, options?: Ledger): Promise<any>

  /**
   * Retrieves information about a particular transaction by its ID.
   * @param transaction - The transaction ID.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-transaction-methods/tx
   */
  tx(transaction: string, options?: TxOptions): Promise<any>

  /**
   * Retrieves historical transactions.
   * @param start - The starting point for history retrieval.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-transaction-methods/tx_history
   */
  txHistory(start: number): Promise<any>

  /**
   * Signs a transaction in preparation for submission to the XRP Ledger.
   * @param txJson - The transaction JSON.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-transaction-methods/sign
   */
  sign(txJson: TxJson, options?: Secrets & AutoFilling): Promise<any>

  /**
   * Signs a transaction for a specific account.
   * @param account - The account for which to sign the transaction.
   * @param txJson - The transaction JSON.
   * @param options - Secrets for signing the transaction.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-transaction-methods/sign_for
   */
  signFor(account: string, txJson: TxJson, options?: Secrets): Promise<any>

  // path and order book methods

  /**
   * Retrieves the order book for a specific currency pair.
   * @param takerGets - The currency that the taker would get.
   * @param takerPays - The currency that the taker would pay.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-path-and-order-book-methods/book_offers
   */
  bookOffers(takerGets: Currency, takerPays: Currency, options?: BookOffersOptions): Promise<any>

  /**
   * Checks if a deposit is authorized between two accounts.
   * @param sourceAccount - The source account.
   * @param destinationAccount - The destination account.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-path-and-order-book-methods/deposit_authorized
   */
  depositAuthorized(sourceAccount: string, destinationAccount: string, options?: Ledger): Promise<any>

  /**
   * Retrieves buy offers for a specific NFT.
   * @param nftId - The ID of the NFT.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-path-and-order-book-methods/nft_buy_offers
   */
  nftBuyOffers(nftId: string, options?: Ledger & Pagination): Promise<any>

  /**
   * Retrieves sell offers for a specific NFT.
   * @param nftId - The ID of the NFT.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-path-and-order-book-methods/nft_sell_offers
   */
  nftSellOffers(nftId: string, options?: Ledger & Pagination): Promise<any>

  /**
   * Finds the best path for a payment from the source account to the destination account for a specific amount.
   * @param sourceAccount - The source account.
   * @param destinationAccount - The destination account.
   * @param destinationAmount - The amount to be delivered to the destination account.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-path-and-order-book-methods/ripple_path_find
   */
  ripplePathFind(
    sourceAccount: string,
    destinationAccount: string,
    destinationAmount: CurrencyAmount,
    options?: RipplePathFindOptions,
  ): Promise<any>

  // payment channel methods

  /**
   * Authorizes a specific amount against a payment channel.
   * @param amount - The amount to authorize.
   * @param channelId - The ID of the channel.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-payment-channel-methods/channel_authorize
   */
  channelAuthorize(amount: string, channelId: string, options?: Secrets): Promise<any>

  /**
   * Verifies a signature against a specific amount and channel.
   * @param amount - The amount to verify.
   * @param channelId - The ID of the channel.
   * @param publicKey - The public key used for signature.
   * @param signature - The signature to verify.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-payment-channel-methods/channel_verify
   */
  channelVerify(amount: string, channelId: string, publicKey: string, signature: string): Promise<any>

  // server info methods

  /**
   * Retrieves information about current fee rates.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-server-info-methods/fee
   */
  fee(): Promise<any>

  /**
   * Retrieves information about the server.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-server-info-methods/server_info
   */
  serverInfo(): Promise<any>

  /**
   * Retrieves the current state of the server.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-server-info-methods/server_state
   */
  serverState(): Promise<any>

  /**
   * Retrieves the manifest of a specific public key.
   * @param publicKey - The public key for which the manifest is requested.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-server-info-methods/manifest
   */
  manifest(publicKey: string): Promise<any>

  // utility methods

  /**
   * Sends a ping to the server.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-utility-methods/ping
   */
  ping(): Promise<any>

  /**
   * Generates a random number using server's random number generator.
   * https://docs.tatum.com/docs/rpc-api-reference/xrp-rpc-documentation/api-calls-for-utility-methods/random
   */
  random(): Promise<any>
}
