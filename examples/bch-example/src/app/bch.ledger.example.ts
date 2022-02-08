import { TatumBchSDK } from '@tatumio/bch'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Currency } from '@tatumio/shared-core'

const bchSDK = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bchLedgerAccountsExample() {
  const account = await bchSDK.ledger.account.create({
    currency: Currency.BCH,
  })
  await bchSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await bchSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.BCH }, { currency: Currency.BCH }],
  })
  await bchSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await bchSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await bchSDK.ledger.account.unfreeze('5e6be89ee6aa436299950c3f')
  await bchSDK.ledger.account.update('5e6be89ee6aa436299950c3f', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await bchSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const accounts = await bchSDK.ledger.account.getAll(10)
  const balance = await bchSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmount = await bchSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await bchSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function bchLedgerBlockAmountExample() {
  const accountId = await bchSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await bchSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await bchSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function bchLedgerCustomerExample() {
  await bchSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await bchSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await bchSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await bchSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await bchSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await bchSDK.ledger.customer.getAll(10)
  const updatedCustomer = await bchSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function bchLedgerOrderbookExample() {
  await bchSDK.ledger.orderBook.cancel('5e68c66581f2ee32bc354087')
  await bchSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')

  const trade = await bchSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await bchSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await bchSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await bchSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const newTrade = await bchSDK.ledger.orderBook.newTrade({
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

export async function bchLedgerTransactionExample() {
  const transaction = await bchSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomer = await bchSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await bchSDK.ledger.transaction.getAll({})

  const transactionByAccount = await bchSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCUstomer = await bchSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await bchSDK.ledger.transaction.getAllByReference('5e6be8e9e6aa436299950c41')
  const transactionResult = await bchSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTxResult = await bchSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function bchLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await bchSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: 'BCH',
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
  const virtualCurrency = await bchSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await bchSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await bchSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await bchSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    basePair: 'EUR',
  })
}
