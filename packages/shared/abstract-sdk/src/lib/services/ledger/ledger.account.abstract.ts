import {
  Account,
  Address,
  ApiServices,
  CreateAccount,
  CreateSubscriptionIncoming,
  LedgerAccountService,
  Wallet,
} from '@tatumio/api-client'

export type GenerateWalletFn = (mnemonic?: string, options?: { testnet?: boolean }) => Promise<Wallet>

export interface GeneratedAccount {
  account: Account
  address: Address
  wallet?: Wallet
}

export class AbstractSdkLedgerAccountService {
  getAccountById = LedgerAccountService.getAccountByAccountId
  createAccount = LedgerAccountService.createAccount
  createAccounts = LedgerAccountService.createAccountBatch
  updateAccount = LedgerAccountService.updateAccountByAccountId
  getBlockedAmountsByAccountId = LedgerAccountService.getBlockAmountById
  blockAmount = LedgerAccountService.blockAmount
  deleteBlockedAmount = LedgerAccountService.deleteBlockAmount
  deleteBlockedAmountWithTransaction = LedgerAccountService.unblockAmountWithTransaction
  activateAccount = LedgerAccountService.activateAccount
  deactivateAccount = LedgerAccountService.deactivateAccount
  freezeAccount = LedgerAccountService.freezeAccount
  unfreezeAccount = LedgerAccountService.unfreezeAccount
  getAccountsByCustomerId = LedgerAccountService.getAccountsByCustomerId
  getAllAccounts = LedgerAccountService.getAllAccounts
  getAccountBalance = LedgerAccountService.getAccountBalance

  /**
   * Abstraction unification endpoint for creating new ledger account, optionally added wallet generation, generating deposit blockchain address
   * and register incoming TX webhook notification.
   * @param account Account to be created.
   * @param generateNewWalletFn Function for creation of the new wallet. If you don't want to create a new wallet, pass undefined
   * @param generateNewWallet Function for creation of the new wallet. If you don't want to create a new wallet, pass undefined
   * @param testnet if we are using testnet or not
   * @param webhookUrl optional URL, where webhook will be post for every incoming blockchain transaction to the address
   */
  public static async generateAccount(
    account: CreateAccount,
    generateNewWalletFn: GenerateWalletFn,
    generateNewWallet = true,
    testnet = true,
    webhookUrl?: string,
  ): Promise<GeneratedAccount> {
    let w
    if (generateNewWallet) {
      w = await generateNewWalletFn(undefined, { testnet })
      // address not in Wallet
      account.xpub = w.xpub // || w.address
    }
    const a = await LedgerAccountService.createAccount(account)
    const address = await ApiServices.offChain.account.generateDepositAddress(a.id)
    if (webhookUrl) {
      await ApiServices.ledger.subscriptions.createSubscription({
        type: CreateSubscriptionIncoming.type.ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION,
        attr: { url: webhookUrl, id: a.id },
      })
    }
    return { account: a, address, wallet: w }
  }
}
