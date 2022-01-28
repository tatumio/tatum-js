import { CreateTrade, VirtualCurrency } from '@tatumio/api-client'
import { TatumCeloSDK } from '@tatumio/celo'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoLedgerAccountExample() {
  const account = await celoSDK.ledger.account.create({
    currency: Currency.CELO,
  })
  const accounts = await celoSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.CELO }, { currency: Currency.CELO }],
  })
  await celoSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await celoSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await celoSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await celoSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await celoSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await celoSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await celoSDK.ledger.account.getAll(10)
  const balance = await celoSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await celoSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await celoSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function celoLedgerBlockAmountExample() {
  const accountId = await celoSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await celoSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await celoSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function celoLedgerCustomerExample() {
  await celoSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await celoSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await celoSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await celoSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')
  const customer = await celoSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await celoSDK.ledger.customer.getAll(10)
  const updatedCustomer = await celoSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function celoLedgerOrderBookExample() {
  await celoSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await celoSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await celoSDK.ledger.orderBook.newTrade({
    // TODO openapi bug
    type: CreateTrade.type.BUY,
    price: '8650.4',
    amount: '15000',
    pair: 'CELO/EUR',
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
  const trade = await celoSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await celoSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await celoSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await celoSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function celoLedgerTransactionExample() {
  const transactionCount = await celoSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await celoSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await celoSDK.ledger.transaction.getAll({})
  const transactionByAccount = await celoSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await celoSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await celoSDK.ledger.transaction.getAllByReference(
    '5e6be8e9e6aa436299950c41',
  )
  const transactionResult = await celoSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await celoSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}
