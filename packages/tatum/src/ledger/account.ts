import {CreateAccount} from '../model'
import {generateDepositAddress} from '../offchain'
import {generateWallet} from '../wallet'
import {createNewSubscription} from './subscription'

/**
 * Abstraction unification endpoint for creating new ledger account, optionally added wallet generation, generating deposit blockchain address
 * and register incoming TX webhook notification.
 * @param account Account to be created.
 * @param generateNewWallet If new wallet should be created as well
 * @param testnet if we are using testnet or not
 * @param webhookUrl optional URL, where webhook will be post for every incoming blockchain transaction to the address
 */
export const generateAccount = async (account: CreateAccount, generateNewWallet = true, testnet = true, webhookUrl?: string) => {
    let w
    if (generateNewWallet) {
        // @ts-ignore
        w = await generateWallet(account.currency, testnet)
        // @ts-ignore
        account.xpub = w.xpub || w.address
    }
    const a = await createAccount(account)
    const address = await generateDepositAddress(a.id)
    if (webhookUrl) {
        await createNewSubscription({type: SubscriptionType.ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION, attr: {url: webhookUrl, id: a.id}})
    }
    return {account: a, address, wallet: w}
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
  } from '@tatumio/tatum-ledger'
  