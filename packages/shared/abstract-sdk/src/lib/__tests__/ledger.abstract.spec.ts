import * as apiClient from '@tatumio/api-client'
import { abstractSdkLedgerService } from '../services/ledger.abstract'
import { blockchainTestFactory, TestCasesApiCallMapping } from '@tatumio/shared-testing-common'

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

    // TODO: we should also test `countByAccount` and `countByCustomer`
  })
})
