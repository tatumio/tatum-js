import { TatumAdaSDK } from '@tatumio/ada'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Currency } from '@tatumio/api-client'

const adaSDK = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function adaLedgerAccountsExample() {
  const account = await adaSDK.ledger.account.create({
    currency: Currency.ADA,
  })
  await adaSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await adaSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.ADA }, { currency: Currency.ADA }],
  })
  await adaSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await adaSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await adaSDK.ledger.account.unfreeze('5e6be89ee6aa436299950c3f')
  await adaSDK.ledger.account.update('5e6be89ee6aa436299950c3f', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await adaSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const accounts = await adaSDK.ledger.account.getAll(10)
  const balance = await adaSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmount = await adaSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await adaSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function adaLedgerBlockAmountExample() {
  const accountId = await adaSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await adaSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await adaSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function adaLedgerCustomerExample() {
  await adaSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await adaSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await adaSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await adaSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await adaSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await adaSDK.ledger.customer.getAll(10)
  const updatedCustomer = await adaSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function adaLedgerOrderbookExample() {
  await adaSDK.ledger.orderBook.cancel('5e68c66581f2ee32bc354087')
  await adaSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')

  const trade = await adaSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await adaSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await adaSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await adaSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const newTrade = await adaSDK.ledger.orderBook.newTrade({
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'BCH/EUR',
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

export async function adaLedgerTransactionExample() {
  const transaction = await adaSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomer = await adaSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await adaSDK.ledger.transaction.getAll({})

  const transactionByAccount = await adaSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCUstomer = await adaSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await adaSDK.ledger.transaction.getAllByReference('5e6be8e9e6aa436299950c41')
  const transactionResult = await adaSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTxResult = await adaSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}
