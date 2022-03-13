import * as apiClient from '@tatumio/api-client'
import { abstractSdkLedgerService } from '../services/ledger.abstract'
import { blockchainTestFactory, TestCasesApiCallMapping, testHelper } from '@tatumio/shared-testing-common'
import { GenerateWalletFn } from '../services/ledger/ledger.account.abstract'
import { CancelablePromise, Wallet } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('SDK - ledger', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('customer', () => {
    const customer = abstractSdkLedgerService().customer

    const api = mockedApi.ledger.customer

    const customerId = 'some-id'
    const customLedgerFunctionsMapping: TestCasesApiCallMapping<typeof customer> = {
      get: [api.getCustomerByExternalOrInternalId, customerId],
      activate: [api.activateCustomer, customerId],
      deactivate: [api.deactivateCustomer, customerId],
      disable: [api.disableCustomer, customerId],
      enable: [api.enableCustomer, customerId],
      getAll: [api.findAllCustomers, 10, 5],
      update: [
        api.updateCustomer,
        customerId,
        {
          externalId: 'some-external-id',
          providerCountry: 'AG',
        },
      ],
    }

    describe('API methods mapping', () => {
      blockchainTestFactory.apiMethods(customer, customLedgerFunctionsMapping)
    })
  })

  describe('orderBook', () => {
    const orderBook = abstractSdkLedgerService().orderBook

    const api = mockedApi.ledger.orderBook

    const orderId = 'some-id'
    const accountId = 'account-id'
    const tradesRequestBody = {
      pageSize: 10,
      id: accountId,
    }
    const orderBookLedgerFunctionsMapping: TestCasesApiCallMapping<typeof orderBook> = {
      get: [api.getTradeById, orderId],
      cancel: [api.deleteTrade, orderId],
      cancelByAccount: [api.deleteAccountTrades, accountId],
      getActiveBuyTrades: [api.getBuyTradesBody, tradesRequestBody],
      getHistorical: [api.getHistoricalTradesBody, tradesRequestBody],
      getActiveSellTrades: [api.getSellTradesBody, tradesRequestBody],
      newTrade: [
        api.storeTrade,
        {
          type: 'BUY',
          price: '20',
          amount: '30',
          currency1AccountId: accountId,
          currency2AccountId: 'account-id-2',
          attr: {
            sealDate: 2,
          },
        },
      ],
    }

    describe('API methods mapping', () => {
      blockchainTestFactory.apiMethods(orderBook, orderBookLedgerFunctionsMapping)
    })
  })

  describe('transaction', () => {
    const transaction = abstractSdkLedgerService().transaction

    const api = mockedApi.ledger.transaction

    const accountId = 'account-id'
    const customerId = 'customer-id'
    const sendTransactionPartialRequestBody = {
      recipientAccountId: 'account-id-2',
      amount: '20',
      senderNote: 'hello',
    }
    const transactionLedgerFunctionsMapping: Omit<
      TestCasesApiCallMapping<typeof transaction>,
      'countByAccount' | 'countByCustomer'
    > = {
      send: [
        api.sendTransaction,
        {
          senderAccountId: accountId,
          ...sendTransactionPartialRequestBody,
        },
      ],
      sendMultiple: [
        api.sendTransactionBatch,
        {
          senderAccountId: accountId,
          transaction: [sendTransactionPartialRequestBody],
        },
      ],
      getAll: [api.getTransactions, { account: accountId }, 10],
      getAllByAccount: [api.getTransactionsByAccountId, { id: accountId }, 10],
      getAllByCustomer: [api.getTransactionsByCustomerId, { id: customerId }, 10],
      getAllByReference: [api.getTransactionsByReference, 'some-reference'],
    }

    describe('API methods mapping', () => {
      blockchainTestFactory.apiMethods<Omit<typeof transaction, 'countByAccount' | 'countByCustomer'>>(
        transaction,
        transactionLedgerFunctionsMapping,
      )
    })

    it('countByAccount', async () => {
      const filter = {
        id: accountId,
      }

      await transaction.countByAccount(filter)

      testHelper.expectMockCalled(api.getTransactionsByAccountId, [filter, 50, 0, true])
    })

    it('countByCustomer', async () => {
      const filter = {
        id: customerId,
      }

      await transaction.countByCustomer(filter)

      testHelper.expectMockCalled(api.getTransactionsByCustomerId, [filter, 50, 0, true])
    })
  })

  describe('virtualCurrency', () => {
    const virtualCurrency = abstractSdkLedgerService().virtualCurrency

    const api = mockedApi.ledger.virtualCurrency

    const virtualCurrencyBase = {
      name: 'VC_new_currency',
      basePair: 'AFN',
      baseRate: 10,
    }
    const virtualCurrencyOperationRequestBody = {
      accountId: 'some-id',
      amount: '20',
      senderNote: 'hello',
    }
    const virtualCurrencyLedgerFunctionsMapping: TestCasesApiCallMapping<typeof virtualCurrency> = {
      create: [
        api.createCurrency,
        {
          ...virtualCurrencyBase,
          supply: '10',
        },
      ],
      mint: [api.mintCurrency, virtualCurrencyOperationRequestBody],
      revoke: [api.revokeCurrency, virtualCurrencyOperationRequestBody],
      getByName: [api.getCurrency, virtualCurrencyBase.name],
      update: [api.updateCurrency, virtualCurrencyBase],
    }

    describe('API methods mapping', () => {
      blockchainTestFactory.apiMethods(virtualCurrency, virtualCurrencyLedgerFunctionsMapping)
    })
  })

  describe('blockAmount', () => {
    const blockAmount = abstractSdkLedgerService().blockAmount

    const api = mockedApi.ledger.account

    const accountId = 'some-id'
    const blockId = 'block-id'
    const blockAmountLedgerFunctionsMapping: TestCasesApiCallMapping<typeof blockAmount> = {
      block: [
        api.blockAmount,
        accountId,
        {
          amount: '10',
          type: 'some-type',
          description: 'hello',
        },
      ],
      unblock: [api.deleteBlockAmount, blockId],
      unblockWithTransaction: [
        api.unblockAmountWithTransaction,
        blockId,
        {
          recipientAccountId: accountId,
          amount: '10',
          senderNote: 'hello',
        },
      ],
    }

    describe('API methods mapping', () => {
      blockchainTestFactory.apiMethods(blockAmount, blockAmountLedgerFunctionsMapping)
    })
  })

  describe('account', () => {
    const account = abstractSdkLedgerService().account

    const api = mockedApi.ledger.account

    const accountId = 'some-id'
    const createAccountRequestBody = {
      currency: 'DOGE',
      xpub: 'some-xpub',
      compliant: true,
    }
    const accountLedgerFunctionsMapping: Omit<TestCasesApiCallMapping<typeof account>, 'generate'> = {
      get: [api.getAccountByAccountId, accountId],
      getAll: [api.getAllAccounts, 10, 10],
      getByCustomerId: [api.getAccountsByCustomerId, 10, 'customer-id'],
      getBalance: [api.getAccountBalance, accountId],
      create: [api.createAccount, createAccountRequestBody],
      createMultiple: [
        api.createAccountBatch,
        {
          accounts: [createAccountRequestBody],
        },
      ],
      update: [api.updateAccountByAccountId, accountId, { accountCode: '12' }],
      getBlockedAmountsByAccountId: [api.getBlockAmountById, accountId],
      activate: [api.activateAccount, accountId],
      deactivate: [api.deactivateAccount, accountId],
      freeze: [api.freezeAccount, accountId],
      unfreeze: [api.unfreezeAccount, accountId],
    }

    describe('API methods mapping', () => {
      blockchainTestFactory.apiMethods<Omit<typeof account, 'generate'>>(
        account,
        accountLedgerFunctionsMapping,
      )
    })

    describe('generate', () => {
      // TODO: need to mock api.ledger.account.createAccount
      it.skip('valid', async () => {
        const generateNewWallet: GenerateWalletFn = (mnemonic?: string): Promise<Wallet> => {
          return new Promise((resolve) => {
            resolve({
              mnemonic,
              xpub: 'some-xpub',
            })
          })
        }

        const webhookUrl = 'some-webhook-url'

        await account.generate(createAccountRequestBody, generateNewWallet, true, true, webhookUrl)

        const accountId = 'some-id'

        mockedApi.ledger.account.createAccount.mockImplementation(() => {
          return new CancelablePromise((resolve) => {
            resolve({
              active: true,
              balance: {
                accountBalance: '20',
                availableBalance: '10',
              },
              currency: 'DOGE',
              frozen: false,
              id: accountId,
            })
          })
        })

        testHelper.expectMockCalled(api.createAccount, [createAccountRequestBody])
        testHelper.expectMockCalled(mockedApi.offChain.account.generateDepositAddress, [accountId])
        testHelper.expectMockCalled(mockedApi.ledger.subscriptions.createSubscription, [
          {
            type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
            attr: { url: webhookUrl, id: accountId },
          },
        ])
      })
    })
  })
})
