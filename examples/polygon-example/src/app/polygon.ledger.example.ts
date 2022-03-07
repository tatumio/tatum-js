import { TatumPolygonSDK } from '@tatumio/polygon'
import { Currency } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const polygonSDK = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function polygonLedgerAccountExample() {
  const account = await polygonSDK.ledger.account.create({
    currency: Currency.MATIC,
  })
  const accounts = await polygonSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.MATIC }, { currency: Currency.MATIC }],
  })
  await polygonSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await polygonSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await polygonSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await polygonSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await polygonSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await polygonSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await polygonSDK.ledger.account.getAll(10)
  const balance = await polygonSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await polygonSDK.ledger.account.getBlockedAmountsByAccountId(
    '5e68c66581f2ee32bc354087',
  )
  const customerAccounts = await polygonSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function polygonLedgerBlockAmountExample() {
  const accountId = await polygonSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await polygonSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await polygonSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function polygonLedgerCustomerExample() {
  await polygonSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await polygonSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await polygonSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await polygonSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')
  const customer = await polygonSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await polygonSDK.ledger.customer.getAll(10)
  const updatedCustomer = await polygonSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function polygonLedgerOrderBookExample() {
  await polygonSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await polygonSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await polygonSDK.ledger.orderBook.newTrade({
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'MATIC/EUR',
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
  const trade = await polygonSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await polygonSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await polygonSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await polygonSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function polygonLedgerTransactionExample() {
  const transactionCount = await polygonSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await polygonSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await polygonSDK.ledger.transaction.getAll({})
  const transactionByAccount = await polygonSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await polygonSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await polygonSDK.ledger.transaction.getAllByReference(
    '5e6be8e9e6aa436299950c41',
  )
  const transactionResult = await polygonSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await polygonSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function polygonLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await polygonSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: 'USDT_MATIC',
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

  const virtualCurrency = await polygonSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')

  const mintTx = await polygonSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })

  const revokeTx = await polygonSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })

  await polygonSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    basePair: 'EUR',
  })
}
