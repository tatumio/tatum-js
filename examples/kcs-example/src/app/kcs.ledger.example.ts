import { TatumKcsSDK } from '@tatumio/kcs'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const kcsSDK = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function kcsLedgerAccountExample() {
  const account = await kcsSDK.ledger.account.create({
    currency: Currency.KCS,
  })
  const accounts = await kcsSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.KCS }, { currency: Currency.KCS }],
  })
  await kcsSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await kcsSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await kcsSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await kcsSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await kcsSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await kcsSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await kcsSDK.ledger.account.getAll(10)
  const balance = await kcsSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await kcsSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await kcsSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function kcsLedgerBlockAmountExample() {
  const accountId = await kcsSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await kcsSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await kcsSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function kcsLedgerCustomerExample() {
  await kcsSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await kcsSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await kcsSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await kcsSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await kcsSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await kcsSDK.ledger.customer.getAll(10)
  const updatedCustomer = await kcsSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function kcsLedgerOrderBookExample() {
  await kcsSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await kcsSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await kcsSDK.ledger.orderBook.newTrade({
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'KCS/EUR',
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
  const trade = await kcsSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await kcsSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await kcsSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await kcsSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function kcsLedgerTransactionExample() {
  const transactionCount = await kcsSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await kcsSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await kcsSDK.ledger.transaction.getAll({})
  const transactionByAccount = await kcsSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await kcsSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await kcsSDK.ledger.transaction.getAllByReference('5e6be8e9e6aa436299950c41')
  const transactionResult = await kcsSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await kcsSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}
