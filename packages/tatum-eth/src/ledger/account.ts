import { CreateAccount, generateAccount as generateAccountCore } from '@tatumio/tatum-core'
import { generateWallet } from '../wallet'

/**
 * Abstraction unification endpoint for creating new ledger account, optionally added wallet generation, generating deposit blockchain address
 * and register incoming TX webhook notification.
 * @param account Account to be created.
 * @param generateNewWallet If new wallet should be created as well
 * @param testnet if we are using testnet or not
 * @param webhookUrl optional URL, where webhook will be post for every incoming blockchain transaction to the address
 */
export const generateAccount = async (account: CreateAccount, generateNewWallet = true, testnet = true, webhookUrl?: string) => {
  return generateAccountCore(account, (_currency, testnet, mnemonic?) => generateWallet(testnet, mnemonic), generateNewWallet, testnet, webhookUrl)
}

export {
  getAccountById,
  createAccount,
  updateAccount,
  createAccounts,
  getBlockedAmountsByAccountId,
  blockAmount,
  deleteBlockedAmount,
  deleteBlockedAmountWithTransaction,
  deleteBlockedAmountForAccount,
  activateAccount,
  deactivateAccount,
  freezeAccount,
  unfreezeAccount,
  getAccountsByCustomerId,
  getAllAccounts,
  getAccountBalance,
} from '@tatumio/tatum-core'
