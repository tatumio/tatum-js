import {
  Account,
  CreateAccount,
  get,
  post,
  generateDepositAddress,
  SubscriptionType,
  UpdateAccount,
  put,
  CreateAccountsBatch,
  Blockage,
  BlockAmount,
  httpDelete,
  BlockageTransaction,
  AccountBalance,
  Address,
} from '@tatumio/tatum-core'
import { createNewSubscription } from './subscription'
import { Wallet } from './wallet'

export type GenerateWalletFn = ((testnet: boolean, mnemonic?: string) => Promise<Wallet>) | ((mnemonic: string) => Promise<Wallet>)
export interface GeneratedAccount {
  account: Account
  address: Address
  wallet?: Wallet
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAccountByAccountId" target="_blank">Tatum API documentation</a>
 */
export const getAccountById = async (id: string): Promise<Account> => get(`/v3/ledger/account/${id}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createAccount" target="_blank">Tatum API documentation</a>
 */
export const createAccount = async (account: CreateAccount): Promise<Account> => post('/v3/ledger/account', account, CreateAccount)

/**
 * Abstraction unification endpoint for creating new ledger account, optionally added wallet generation, generating deposit blockchain address
 * and register incoming TX webhook notification.
 * @param account Account to be created.
 * @param generateNewWalletFn Function for creation of the new wallet. If you don't want to create a new wallet, pass undefined
 * @param testnet if we are using testnet or not
 * @param webhookUrl optional URL, where webhook will be post for every incoming blockchain transaction to the address
 */
export const generateAccount = async (
  account: CreateAccount,
  generateNewWalletFn: GenerateWalletFn,
  generateNewWallet = true,
  testnet = true,
  webhookUrl?: string
): Promise<GeneratedAccount> => {
  let w
  if (generateNewWallet) {
    // @ts-ignore
    w = await generateNewWalletFn(testnet)
    // @ts-ignore
    account.xpub = w.xpub || w.address
  }
  const a = await createAccount(account)
  const address = await generateDepositAddress(a.id)
  if (webhookUrl) {
    await createNewSubscription({ type: SubscriptionType.ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION, attr: { url: webhookUrl, id: a.id } })
  }
  return { account: a, address, wallet: w }
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/updateAccountByAccountId" target="_blank">Tatum API documentation</a>
 */
export const updateAccount = async (id: string, account: UpdateAccount): Promise<Account> =>
  put(`/v3/ledger/account/${id}`, account, UpdateAccount)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createAccountBatch" target="_blank">Tatum API documentation</a>
 */
export const createAccounts = async (accounts: CreateAccountsBatch): Promise<Account[]> =>
  post('/v3/ledger/account/batch', accounts, CreateAccountsBatch)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getBlockAmount" target="_blank">Tatum API documentation</a>
 */
export const getBlockedAmountsByAccountId = async (id: string, pageSize = 50, offset = 0): Promise<Blockage[]> =>
  get(`/v3/ledger/account/block/${id}?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/blockAmount" target="_blank">Tatum API documentation</a>
 */
export const blockAmount = async (id: string, block: BlockAmount): Promise<{ id: string }> =>
  post(`/v3/ledger/account/block/${id}`, block, BlockAmount)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteBlockAmount" target="_blank">Tatum API documentation</a>
 */
export const deleteBlockedAmount = async (id: string): Promise<void> => httpDelete(`/v3/ledger/account/block/${id}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/unblockAmountWithTransaction" target="_blank">Tatum API documentation</a>
 */
export const deleteBlockedAmountWithTransaction = async (id: string, txData: BlockageTransaction): Promise<{ reference: string }> =>
  put(`/v3/ledger/account/block/${id}`, txData, BlockageTransaction)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteAllBlockAmount" target="_blank">Tatum API documentation</a>
 */
export const deleteBlockedAmountForAccount = async (id: string): Promise<void> => httpDelete(`/v3/ledger/account/block/account/${id}`)

/**
 * Activates deactivated account. If active account is deactivated nothing will happen.
 *
 * For more details, see <a href="https://tatum.io/apidoc#operation/activateAccount" target="_blank">Tatum API documentation</a>
 */
export const activateAccount = async (id: string): Promise<void> => put(`v3/ledger/account/${id}/activate`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deactivateAccount" target="_blank">Tatum API documentation</a>
 */
export const deactivateAccount = async (id: string): Promise<void> => put(`/v3/ledger/account/${id}/deactivate`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/freezeAccount" target="_blank">Tatum API documentation</a>
 */
export const freezeAccount = async (id: string): Promise<void> => put(`/v3/ledger/account/${id}/freeze`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/unfreezeAccount" target="_blank">Tatum API documentation</a>
 */
export const unfreezeAccount = async (id: string): Promise<void> => put(`/v3/ledger/account/${id}/unfreeze`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAccountsByCustomerId" target="_blank">Tatum API documentation</a>
 */
export const getAccountsByCustomerId = async (id: string, pageSize = 50, offset = 0): Promise<Account[]> =>
  get(`/v3/ledger/account/customer/${id}?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAllAccounts" target="_blank">Tatum API documentation</a>
 */
export const getAllAccounts = async (pageSize = 50, offset = 0): Promise<Account[]> =>
  get(`/v3/ledger/account?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAccountBalance" target="_blank">Tatum API documentation</a>
 */
export const getAccountBalance = async (id: string): Promise<AccountBalance> => get(`/v3/ledger/account/${id}/balance`)
