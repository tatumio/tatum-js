import { 
    CreateAccount, 
    generateAccount as generateAccountCore
  } from '@tatumio/tatum-core'  
import { generateWallet } from '../wallet'

export const generateAccount = async (account: CreateAccount, generateNewWallet = true, testnet = true, webhookUrl?: string) => {
    return generateAccountCore(account, generateWallet, generateNewWallet, testnet, webhookUrl)
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
    getAccountBalance
} from '@tatumio/tatum-core'
