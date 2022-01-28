import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumXlmSDK } from '@tatumio/xlm'
import { Currency } from '@tatumio/shared-core'
import { CreateTrade, VirtualCurrency } from '@tatumio/api-client'

const xlmSDK = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const xlmLedgerAccountExample = async () => {
  const account = await xlmSDK.ledger.account.create({
    currency: Currency.XLM,
  })
  await xlmSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await xlmSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.XLM }, { currency: Currency.XLM }],
  })
  await xlmSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await xlmSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await xlmSDK.ledger.account.unfreeze('5e6be89ee6aa436299950c3f')
  await xlmSDK.ledger.account.update('5e6be89ee6aa436299950c3f', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await xlmSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const accounts = await xlmSDK.ledger.account.getAll(10)
  const balance = await xlmSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmount = await xlmSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await xlmSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export const xlmLedgerCustomerExample = async () => {
  await xlmSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await xlmSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await xlmSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await xlmSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await xlmSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await xlmSDK.ledger.customer.getAll(10)
  const updatedCustomer = await xlmSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export const xlmLedgerOrderBookExample = async () => {
  await xlmSDK.ledger.orderBook.cancel('5e68c66581f2ee32bc354087')
  await xlmSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')

  const trade = await xlmSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await xlmSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await xlmSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await xlmSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const newTrade = await xlmSDK.ledger.orderBook.newTrade({
    type: CreateTrade.type.BUY,
    price: '8650.4',
    amount: '15000',
    pair: 'XLM/EUR',
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

export const xlmLedgerTransactionExample = async () => {
  const transaction = await xlmSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomer = await xlmSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await xlmSDK.ledger.transaction.getAll({})

  const transactionByAccount = await xlmSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCUstomer = await xlmSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await xlmSDK.ledger.transaction.getAllByReference('5e6be8e9e6aa436299950c41')
  const transactionResult = await xlmSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTxResult = await xlmSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export const xlmLedgerVirtualCurrencyExample = async () => {
  const virtualCurrencyAcc = await xlmSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: VirtualCurrency.basePair.XLM,
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
  const virtualCurrency = await xlmSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await xlmSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await xlmSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await xlmSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    basePair: VirtualCurrency.basePair.EUR,
  })
}

export const xlmLedgerBlockAmountExample = async () => {
  const accountId = await xlmSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await xlmSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await xlmSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}
