import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumXrpSDK } from '@tatumio/xrp'
import { Currency } from '@tatumio/shared-core'
import { CreateTrade, VirtualCurrency } from '@tatumio/api-client'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const xrpLedgerAccountExample = async () => {
  const account = await xrpSDK.ledger.account.create({
    currency: Currency.XRP,
  })
  await xrpSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.XRP }, { currency: Currency.XRP }],
  })
  await xrpSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.account.unfreeze('5e6be89ee6aa436299950c3f')
  await xrpSDK.ledger.account.update('5e6be89ee6aa436299950c3f', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await xrpSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const accounts = await xrpSDK.ledger.account.getAll(10)
  const balance = await xrpSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmount = await xrpSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await xrpSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export const xrpLedgerCustomerExample = async () => {
  await xrpSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await xrpSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await xrpSDK.ledger.customer.getAll(10)
  const updatedCustomer = await xrpSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export const xrpLedgerOrderBookExample = async () => {
  await xrpSDK.ledger.orderBook.cancel('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')

  const trade = await xrpSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await xrpSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await xrpSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await xrpSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const newTrade = await xrpSDK.ledger.orderBook.newTrade({
    type: CreateTrade.type.BUY,
    price: '8650.4',
    amount: '15000',
    pair: 'XRP/EUR',
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

export const xrpLedgerTransactionExample = async () => {
  const transaction = await xrpSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomer = await xrpSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await xrpSDK.ledger.transaction.getAll({})

  const transactionByAccount = await xrpSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCUstomer = await xrpSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await xrpSDK.ledger.transaction.getAllByReference('5e6be8e9e6aa436299950c41')
  const transactionResult = await xrpSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTxResult = await xrpSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export const xrpLedgerVirtualCurrencyExample = async () => {
  const virtualCurrencyAcc = await xrpSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: VirtualCurrency.basePair.XRP,
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
  const virtualCurrency = await xrpSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await xrpSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await xrpSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await xrpSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    basePair: VirtualCurrency.basePair.EUR,
  })
}

export const xrpLedgerBlockAmountExample = async () => {
  const accountId = await xrpSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await xrpSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await xrpSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}
