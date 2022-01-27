import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Currency } from '@tatumio/shared-core'
import { CreateTrade, VirtualCurrency } from '@tatumio/api-client'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeLedgerAccountsExample() {
  const account = await dogeSDK.ledger.account.create({
    currency: Currency.DOGE,
  })
  await dogeSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await dogeSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.DOGE }, { currency: Currency.DOGE }],
  })
  await dogeSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await dogeSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await dogeSDK.ledger.account.unfreeze('5e6be89ee6aa436299950c3f')
  await dogeSDK.ledger.account.update('5e6be89ee6aa436299950c3f', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await dogeSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const accounts = await dogeSDK.ledger.account.getAll(10)
  const balance = await dogeSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmount = await dogeSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await dogeSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function dogeLedgerBlockAmountExample() {
  const accountId = await dogeSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await dogeSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await dogeSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function dogeLedgerCustomerExample() {
  await dogeSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await dogeSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await dogeSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await dogeSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await dogeSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await dogeSDK.ledger.customer.getAll(10)
  const updatedCustomer = await dogeSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function dogeLedgerOrderBookExample() {
  await dogeSDK.ledger.orderBook.cancel('5e68c66581f2ee32bc354087')
  await dogeSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')

  const trade = await dogeSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await dogeSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await dogeSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await dogeSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const newTrade = await dogeSDK.ledger.orderBook.newTrade({
    type: CreateTrade.type.BUY,
    price: '8650.4',
    amount: '15000',
    pair: 'DOGE/EUR',
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

export async function dogeLedgerTransactionExample() {
  const transaction = await dogeSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomer = await dogeSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await dogeSDK.ledger.transaction.getAll({})

  const transactionByAccount = await dogeSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCUstomer = await dogeSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await dogeSDK.ledger.transaction.getAllByReference(
    '5e6be8e9e6aa436299950c41',
  )
  const transactionResult = await dogeSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTxResult = await dogeSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function dogeLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await dogeSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: VirtualCurrency.basePair.DOGE,
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
  const virtualCurrency = await dogeSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await dogeSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await dogeSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await dogeSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    basePair: VirtualCurrency.basePair.EUR,
  })
}
