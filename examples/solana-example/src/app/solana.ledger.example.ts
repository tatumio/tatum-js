import { TatumSolanaSDK } from '@tatumio/solana'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const solanaSDK = TatumSolanaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function solanaLedgerAccountExample() {
  const account = await solanaSDK.ledger.account.create({
    currency: Currency.SOL,
  })
  const accounts = await solanaSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.SOL }, { currency: Currency.SOL }],
  })
  await solanaSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await solanaSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await solanaSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await solanaSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await solanaSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await solanaSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await solanaSDK.ledger.account.getAll(10)
  const balance = await solanaSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await solanaSDK.ledger.account.getBlockedAmountsByAccountId(
    '5e68c66581f2ee32bc354087',
  )
  const customerAccounts = await solanaSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function solanaLedgerBlockAmountExample() {
  const accountId = await solanaSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await solanaSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await solanaSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function solanaLedgerCustomerExample() {
  await solanaSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await solanaSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await solanaSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await solanaSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')
  const customer = await solanaSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await solanaSDK.ledger.customer.getAll(10)
  const updatedCustomer = await solanaSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function solanaLedgerOrderBookExample() {
  await solanaSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await solanaSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await solanaSDK.ledger.orderBook.newTrade({
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'solana/EUR',
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
  const trade = await solanaSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await solanaSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await solanaSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await solanaSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function solanaLedgerTransactionExample() {
  const transactionCount = await solanaSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await solanaSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await solanaSDK.ledger.transaction.getAll({})
  const transactionByAccount = await solanaSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await solanaSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await solanaSDK.ledger.transaction.getAllByReference(
    '5e6be8e9e6aa436299950c41',
  )
  const transactionResult = await solanaSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await solanaSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}
