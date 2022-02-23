import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumFlowSDK } from '@tatumio/flow'
import { Currency } from '@tatumio/api-client'

const flowSDK = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const flowLedgerAccountExample = async () => {
  const account = await flowSDK.ledger.account.create({
    currency: Currency.FLOW,
  })
  await flowSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await flowSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.FLOW }, { currency: Currency.FLOW }],
  })
  await flowSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await flowSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await flowSDK.ledger.account.unfreeze('5e6be89ee6aa436299950c3f')
  await flowSDK.ledger.account.update('5e6be89ee6aa436299950c3f', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await flowSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const accounts = await flowSDK.ledger.account.getAll(10)
  const balance = await flowSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmount = await flowSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await flowSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export const flowLedgerCustomerExample = async () => {
  await flowSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await flowSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await flowSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await flowSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await flowSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await flowSDK.ledger.customer.getAll(10)
  const updatedCustomer = await flowSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export const flowLedgerOrderBookExample = async () => {
  await flowSDK.ledger.orderBook.cancel('5e68c66581f2ee32bc354087')
  await flowSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')

  const trade = await flowSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await flowSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await flowSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await flowSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const newTrade = await flowSDK.ledger.orderBook.newTrade({
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'FLOW/EUR',
    currency1AccountId: '7c21ed165e294db78b95f0f1',
    currency2AccountId: '7c21ed165e294db78b95f0f1',
    feeAccountId: '7c21ed165e294db78b95f0f1',
    fee: 1.5,
    attr: {
      sealDate: 1572031674384,
      percentBlock: 1.5,
      percentPenalty: 1.5,
    },
  })
}

export const flowLedgerTransactionExample = async () => {
  const transaction = await flowSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomer = await flowSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await flowSDK.ledger.transaction.getAll({})

  const transactionByAccount = await flowSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await flowSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await flowSDK.ledger.transaction.getAllByReference(
    '5e6be8e9e6aa436299950c41',
  )
  const transactionResult = await flowSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTxResult = await flowSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export const flowLedgerVirtualCurrencyExample = async () => {
  const virtualCurrencyAcc = await flowSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: 'FLOW',
    baseRate: 1,
    customer: {
      accountingCurrency: 'USD',
      customerCountry: 'US',
      externalId: '123654',
      providerCountry: 'US',
    },
    description: 'My Virtual Token description.',
    accountCode: 'AC_1011_B',
    accountNumber: '1234567890',
    accountingCurrency: 'USD',
  })
  const virtualCurrency = await flowSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await flowSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await flowSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await flowSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    basePair: 'EUR',
  })
}

export const flowLedgerBlockAmountExample = async () => {
  const accountId = await flowSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await flowSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
    anonymous: false,
    compliant: false,
    transactionCode: '1_01_EXTERNAL_CODE',
    paymentId: '9625',
    recipientNote: 'Private note',
    baseRate: 1,
    senderNote: 'Sender note',
  })
  await flowSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}
