import {
  AccountService,
  ApiServices,
  CreateAccount,
  CustomerService,
  OrderBookService,
  TransactionFilter,
  TransactionFilterCustomer,
  TransactionService,
  VirtualCurrencyService,
} from '@tatumio/api-client'
import { GeneratedAccount, GenerateWalletFn } from './ledger/ledger.account.abstract'

export const abstractSdkLedgerService = () => {
  return {
    customer: {
      get: CustomerService.getCustomerByExternalOrInternalId,
      getAll: CustomerService.findAllCustomers,
      update: CustomerService.updateCustomer,
      activate: CustomerService.activateCustomer,
      deactivate: CustomerService.deactivateCustomer,
      enable: CustomerService.enableCustomer,
      disable: CustomerService.disableCustomer,
    },
    orderBook: {
      getHistorical: OrderBookService.getHistoricalTradesBody,
      getActiveBuyTrades: OrderBookService.getBuyTradesBody,
      getActiveSellTrades: OrderBookService.getSellTradesBody,
      newTrade: OrderBookService.storeTrade,
      get: OrderBookService.getTradeById,
      cancel: OrderBookService.deleteTrade,
      cancelByAccount: OrderBookService.deleteAccountTrades,
    },
    transaction: {
      send: TransactionService.sendTransaction,
      sendMultiple: TransactionService.sendTransactionBatch,
      getAll: TransactionService.getTransactions,
      getAllByAccount: TransactionService.getTransactionsByAccountId,
      getAllByCustomer: TransactionService.getTransactionsByCustomerId,
      getAllByReference: TransactionService.getTransactionsByReference,
      countByAccount: function (filter: TransactionFilter) {
        return TransactionService.getTransactionsByAccountId(filter, 50, 0, true)
      },
      countByCustomer: function (filter: TransactionFilterCustomer) {
        return TransactionService.getTransactionsByCustomerId(filter, 50, 0, true)
      },
      // @TODO OPENAPI
      /*countByReference: function (reference: string) {
        return this.getAllByReference(reference, 50, 0, true)
      },*/
    },
    virtualCurrency: {
      create: VirtualCurrencyService.createCurrency,
      mint: VirtualCurrencyService.mintCurrency,
      revoke: VirtualCurrencyService.revokeCurrency,
      getByName: VirtualCurrencyService.getCurrency,
      update: VirtualCurrencyService.updateCurrency,
    },
    blockAmount: {
      block: AccountService.blockAmount,
      unblock: AccountService.deleteBlockAmount,
      unblockWithTransaction: AccountService.unblockAmountWithTransaction,
    },
    account: {
      get: AccountService.getAccountByAccountId,
      getAll: AccountService.getAccounts,
      getByCustomerId: AccountService.getAccountsByCustomerId,
      getBalance: AccountService.getAccountBalance,
      create: AccountService.createAccount,
      createMultiple: AccountService.createAccountBatch,
      update: AccountService.updateAccountByAccountId,
      getBlockedAmountsByAccountId: AccountService.getBlockAmountById,
      activate: AccountService.activateAccount,
      deactivate: AccountService.deactivateAccount,
      freeze: AccountService.freezeAccount,
      unfreeze: AccountService.unfreezeAccount,
      /**
       * Abstraction unification endpoint for creating new ledger account, optionally added wallet generation, generating deposit blockchain address
       * and register incoming TX webhook notification.
       * @param account Account to be created.
       * @param generateNewWalletFn Function for creation of the new wallet. If you don't want to create a new wallet, pass undefined
       * @param generateNewWallet Function for creation of the new wallet. If you don't want to create a new wallet, pass undefined
       * @param testnet if we are using testnet or not
       * @param webhookUrl optional URL, where webhook will be post for every incoming blockchain transaction to the address
       */
      generate: async (
        account: CreateAccount & { xpub?: string },
        generateNewWalletFn: GenerateWalletFn,
        generateNewWallet = true,
        testnet = true,
        webhookUrl?: string,
      ): Promise<GeneratedAccount> => {
        let w
        if (generateNewWallet) {
          w = await generateNewWalletFn(undefined, { testnet })
          account.xpub = w.xpub // || w.address @TODO not in wallet type
        }
        const a = await AccountService.createAccount(account)
        const address = await ApiServices.virtualAccount.account.generateDepositAddress(a.id)
        if (webhookUrl) {
          await ApiServices.ledger.subscriptions.createSubscription({
            type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
            attr: { url: webhookUrl, id: a.id },
          })
        }
        return { account: a, address, wallet: w }
      },
    },
  }
}
