import { 
    CreateAccount,
    createAccount, 
    generateDepositAddress
} from '@tatumio/tatum-core'  
import { generateAlgoWallet } from '../wallet'

export const generateAccount = async (account: CreateAccount, generateNewWallet = true, testnet = true, webhookUrl?: string) => {
    let w;
    if (generateNewWallet) {
        w = await generateAlgoWallet();
        account.xpub = w.address;
    }
    const a = await createAccount(account)
    const address = await generateDepositAddress(a.id)
    return { account: a, address, wallet: w }
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
