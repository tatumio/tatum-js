import { TatumEgldSDK } from '@tatumio/egld'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldLedgerAccountExample() {
  const account = await egldSDK.ledger.account.create({
    currency: Currency.EGLD,
  })
  const accounts = await egldSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.EGLD }, { currency: Currency.EGLD }],
  })
  await egldSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await egldSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await egldSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await egldSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await egldSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await egldSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await egldSDK.ledger.account.getAll(10)
  const balance = await egldSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await egldSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await egldSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function egldLedgerBlockAmountExample() {
  const accountId = await egldSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await egldSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await egldSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function egldLedgerCustomerExample() {
  await egldSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await egldSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await egldSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await egldSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await egldSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await egldSDK.ledger.customer.getAll(10)
  const updatedCustomer = await egldSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function egldLedgerOrderBookExample() {
  await egldSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await egldSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await egldSDK.ledger.orderBook.newTrade({
    // TODO openapi bug
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'EGLD/EUR',
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
  const trade = await egldSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await egldSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await egldSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await egldSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function egldLedgerTransactionExample() {
  const transactionCount = await egldSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await egldSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await egldSDK.ledger.transaction.getAll({})
  const transactionByAccount = await egldSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await egldSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await egldSDK.ledger.transaction.getAllByReference(
    '5e6be8e9e6aa436299950c41',
  )
  const transactionResult = await egldSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await egldSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function egldLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await egldSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    // @ts-ignore
    // TODO openapi bug
    basePair: 'EGLD',
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
  const virtualCurrency = await egldSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await egldSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await egldSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await egldSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    // TODO openapi bug
    basePair: 'USD',
  })
}
