import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Currency } from '@tatumio/shared-core'
import { CreateTrade, VirtualCurrency } from '@tatumio/api-client'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcLedgerAccountsExample() {
  const account = await ltcSDK.ledger.account.create({
    currency: Currency.LTC,
  })
  await ltcSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await ltcSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.LTC }, { currency: Currency.LTC }],
  })
  await ltcSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await ltcSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await ltcSDK.ledger.account.unfreeze('5e6be89ee6aa436299950c3f')
  await ltcSDK.ledger.account.update('5e6be89ee6aa436299950c3f', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await ltcSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const accounts = await ltcSDK.ledger.account.getAll(10)
  const balance = await ltcSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmount = await ltcSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await ltcSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function ltcLedgerBlockAmountExample() {
  const accountId = await ltcSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await ltcSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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

  await ltcSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function ltcLedgerCustomerExample() {
  await ltcSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await ltcSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await ltcSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await ltcSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await ltcSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await ltcSDK.ledger.customer.getAll(10)
  const updatedCustomer = await ltcSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function ltcLedgerOrderBookExample() {
  await ltcSDK.ledger.orderBook.cancel('5e68c66581f2ee32bc354087')
  await ltcSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')

  const trade = await ltcSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await ltcSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await ltcSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await ltcSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const newTrade = await ltcSDK.ledger.orderBook.newTrade({
    type: CreateTrade.type.BUY,
    price: '8650.4',
    amount: '15000',
    pair: 'LTC/EUR',
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

export async function ltcLedgerTransactionExample() {
  const transaction = await ltcSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomer = await ltcSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await ltcSDK.ledger.transaction.getAll({})
  const transactionByAccount = await ltcSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCUstomer = await ltcSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await ltcSDK.ledger.transaction.getAllByReference('5e6be8e9e6aa436299950c41')
  const transactionResult = await ltcSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTxResult = await ltcSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function ltcLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await ltcSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: VirtualCurrency.basePair.LTC,
    baseRate: 1,
    customer: {
      accountingCurrency: VirtualCurrency.accountingCurrency.USD,
      customerCountry: 'US',
      externalId: '123654',
      providerCountry: 'US',
    },
    description: 'My Virtual Token description.',
    accountCode: 'AC_1011_B',
    accountNumber: '1234567890',
    accountingCurrency: VirtualCurrency.accountingCurrency.USD,
  })
  const virtualCurrency = await ltcSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await ltcSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await ltcSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await ltcSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    basePair: VirtualCurrency.basePair.EUR,
  })
}
