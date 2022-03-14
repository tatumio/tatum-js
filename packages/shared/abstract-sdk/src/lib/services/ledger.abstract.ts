import {
  ApiServices,
  CreateAccount,
  LedgerAccountService,
  LedgerCustomerService,
  LedgerOrderBookService,
  LedgerTransactionService,
  LedgerVirtualCurrencyService,
  TransactionFilter,
  TransactionFilterCustomer,
} from '@tatumio/api-client'
import { GeneratedAccount, GenerateWalletFn } from './ledger/ledger.account.abstract'

export const abstractSdkLedgerService = () => {
  return {
    customer: {
      get: LedgerCustomerService.getCustomerByExternalOrInternalId,
      getAll: LedgerCustomerService.findAllCustomers,
      update: LedgerCustomerService.updateCustomer,
      activate: LedgerCustomerService.activateCustomer,
      deactivate: LedgerCustomerService.deactivateCustomer,
      enable: LedgerCustomerService.enableCustomer,
      disable: LedgerCustomerService.disableCustomer,
    },
    orderBook: {
      getHistorical: LedgerOrderBookService.getHistoricalTradesBody,
      getActiveBuyTrades: LedgerOrderBookService.getBuyTradesBody,
      getActiveSellTrades: LedgerOrderBookService.getSellTradesBody,
      newTrade: LedgerOrderBookService.storeTrade,
      get: LedgerOrderBookService.getTradeById,
      cancel: LedgerOrderBookService.deleteTrade,
      cancelByAccount: LedgerOrderBookService.deleteAccountTrades,
    },
    transaction: {
      send: LedgerTransactionService.sendTransaction,
      sendMultiple: LedgerTransactionService.sendTransactionBatch,
      getAll: LedgerTransactionService.getTransactions,
      getAllByAccount: LedgerTransactionService.getTransactionsByAccountId,
      getAllByCustomer: LedgerTransactionService.getTransactionsByCustomerId,
      getAllByReference: LedgerTransactionService.getTransactionsByReference,
      countByAccount: function (filter: TransactionFilter) {
        return LedgerTransactionService.getTransactionsByAccountId(filter, 50, 0, true)
      },
      countByCustomer: function (filter: TransactionFilterCustomer) {
        return LedgerTransactionService.getTransactionsByCustomerId(filter, 50, 0, true)
      },
      // @TODO OPENAPI
      /*countByReference: function (reference: string) {
        return this.getAllByReference(reference, 50, 0, true)
      },*/
    },
    virtualCurrency: {
      create: LedgerVirtualCurrencyService.createCurrency,
      mint: LedgerVirtualCurrencyService.mintCurrency,
      revoke: LedgerVirtualCurrencyService.revokeCurrency,
      getByName: LedgerVirtualCurrencyService.getCurrency,
      update: LedgerVirtualCurrencyService.updateCurrency,
    },
    blockAmount: {
      block: LedgerAccountService.blockAmount,
      unblock: LedgerAccountService.deleteBlockAmount,
      unblockWithTransaction: LedgerAccountService.unblockAmountWithTransaction,
    },
    account: {
      get: LedgerAccountService.getAccountByAccountId,
      getAll: LedgerAccountService.getAllAccounts,
      getByCustomerId: LedgerAccountService.getAccountsByCustomerId,
      getBalance: LedgerAccountService.getAccountBalance,
      create: LedgerAccountService.createAccount,
      createMultiple: LedgerAccountService.createAccountBatch,
      update: LedgerAccountService.updateAccountByAccountId,
      getBlockedAmountsByAccountId: LedgerAccountService.getBlockAmountById,
      activate: LedgerAccountService.activateAccount,
      deactivate: LedgerAccountService.deactivateAccount,
      freeze: LedgerAccountService.freezeAccount,
      unfreeze: LedgerAccountService.unfreezeAccount,
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
        account: CreateAccount,
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
        const a = await LedgerAccountService.createAccount(account)
        const address = await ApiServices.offChain.account.generateDepositAddress(a.id)
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
