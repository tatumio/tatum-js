import { TatumTronSDK } from '@tatumio/tron'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronLedgerAccountExample() {
  const account = await tronSDK.ledger.account.create({
    currency: Currency.ETH,
  })
  const accounts = await tronSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.ETH }, { currency: Currency.ETH }],
  })
  await tronSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await tronSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await tronSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await tronSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await tronSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await tronSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await tronSDK.ledger.account.getAll(10)
  const balance = await tronSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await tronSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await tronSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function tronLedgerBlockAmountExample() {
  const accountId = await tronSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await tronSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await tronSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function tronLedgerCustomerExample() {
  await tronSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await tronSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await tronSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await tronSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await tronSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await tronSDK.ledger.customer.getAll(10)
  const updatedCustomer = await tronSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function tronLedgerOrderBookExample() {
  await tronSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await tronSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await tronSDK.ledger.orderBook.newTrade({
    // TODO openapi bug
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'ETH/EUR',
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
  const trade = await tronSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await tronSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await tronSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await tronSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function tronLedgerTransactionExample() {
  const transactionCount = await tronSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await tronSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await tronSDK.ledger.transaction.getAll({})
  const transactionByAccount = await tronSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await tronSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await tronSDK.ledger.transaction.getAllByReference(
    '5e6be8e9e6aa436299950c41',
  )
  const transactionResult = await tronSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await tronSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function tronLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await tronSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    // TODO openapi bug
    basePair: 'ETH',
    baseRate: 1,
    customer: {
      // TODO openapi bug
      accountingCurrency: 'USD',
      customerCountry: 'US',
      externalId: '123654',
      providerCountry: 'US',
    },
    description: 'My Virtual Token description.',
    accountCode: 'AC_1011_B',
    accountNumber: '1234567890',
    // TODO openapi bug
    accountingCurrency: 'USD',
  })
  const virtualCurrency = await tronSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await tronSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await tronSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await tronSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    // TODO openapi bug
    basePair: 'USD',
  })
}
