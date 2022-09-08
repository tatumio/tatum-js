import {
  Account,
  AccountService,
  Address,
  ApiServices,
  CreateAccountXpub,
  CustomerService,
  Wallet,
} from '@tatumio/api-client'

export type GenerateWalletFn = (mnemonic?: string, options?: { testnet?: boolean }) => Promise<Wallet>

export interface GeneratedAccount {
  account: Account
  address: Address
  wallet?: Wallet
}

// @TODO remove after OPENAPI change
export class AbstractSdkLedgerCustomerService {
  getCustomer = CustomerService.getCustomerByExternalOrInternalId
  getAllCustomers = CustomerService.findAllCustomers
  updateCustomer = CustomerService.updateCustomer
  activateCustomer = CustomerService.activateCustomer
  deactivateCustomer = CustomerService.deactivateCustomer
  enableCustomer = CustomerService.enableCustomer
  disableCustomer = CustomerService.disableCustomer

  getAccountById = AccountService.getAccountByAccountId
  createAccount = AccountService.createAccount
  createAccounts = AccountService.createAccountBatch
  updateAccount = AccountService.updateAccountByAccountId
  getBlockedAmountsByAccountId = AccountService.getBlockAmountById
  blockAmount = AccountService.blockAmount
  deleteBlockedAmount = AccountService.deleteBlockAmount
  deleteBlockedAmountWithTransaction = AccountService.unblockAmountWithTransaction
  activateAccount = AccountService.activateAccount
  deactivateAccount = AccountService.deactivateAccount
  freezeAccount = AccountService.freezeAccount
  unfreezeAccount = AccountService.unfreezeAccount
  getAccountsByCustomerId = AccountService.getAccountsByCustomerId
  getAllAccounts = AccountService.getAccounts
  getAccountBalance = AccountService.getAccountBalance

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
    account: CreateAccountXpub,
    generateNewWalletFn: GenerateWalletFn,
    generateNewWallet = true,
    testnet = true,
    webhookUrl?: string,
  ): Promise<GeneratedAccount> {
    let w
    if (generateNewWallet) {
      w = await generateNewWalletFn(undefined, { testnet })
      account.xpub = w.xpub || w.address
    }
    const a = await AccountService.createAccount(account)
    const address = await ApiServices.offChain.account.generateDepositAddress(a.id)
    if (webhookUrl) {
      await ApiServices.ledger.subscriptions.createSubscription({
        type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
        attr: { url: webhookUrl, id: a.id },
      })
    }
    return { account: a, address, wallet: w }
  }
}
