import { CreateTrade } from '@tatumio/api-client'
import { TatumOneSDK } from '@tatumio/one'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneLedgerAccountExample() {
  const account = await oneSDK.ledger.account.create({
    currency: Currency.ONE,
  })
  const accounts = await oneSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.ONE }, { currency: Currency.ONE }],
  })
  await oneSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await oneSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await oneSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await oneSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await oneSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await oneSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await oneSDK.ledger.account.getAll(10)
  const balance = await oneSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await oneSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await oneSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function oneLedgerBlockAmountExample() {
  const accountId = await oneSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await oneSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await oneSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function oneLedgerCustomerExample() {
  await oneSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await oneSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await oneSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await oneSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await oneSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await oneSDK.ledger.customer.getAll(10)
  const updatedCustomer = await oneSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function oneLedgerOrderBookExample() {
  await oneSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await oneSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await oneSDK.ledger.orderBook.newTrade({
    // TODO openapi bug
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'ONE/EUR',
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
  const trade = await oneSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await oneSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await oneSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await oneSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function oneLedgerTransactionExample() {
  const transactionCount = await oneSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await oneSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await oneSDK.ledger.transaction.getAll({})
  const transactionByAccount = await oneSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await oneSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await oneSDK.ledger.transaction.getAllByReference('5e6be8e9e6aa436299950c41')
  const transactionResult = await oneSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await oneSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}
