import { TatumKlaytnSDK } from '@tatumio/klaytn'
import { Currency } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const klaytnSDK = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function klaytnLedgerAccountExample() {
  const account = await klaytnSDK.ledger.account.create({
    currency: Currency.KLAY,
  })
  const accounts = await klaytnSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.KLAY }, { currency: Currency.KLAY }],
  })
  await klaytnSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await klaytnSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await klaytnSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await klaytnSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await klaytnSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await klaytnSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await klaytnSDK.ledger.account.getAll(10)
  const balance = await klaytnSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await klaytnSDK.ledger.account.getBlockedAmountsByAccountId(
    '5e68c66581f2ee32bc354087',
  )
  const customerAccounts = await klaytnSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function klaytnLedgerBlockAmountExample() {
  const accountId = await klaytnSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await klaytnSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await klaytnSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function klaytnLedgerCustomerExample() {
  await klaytnSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await klaytnSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await klaytnSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await klaytnSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')
  const customer = await klaytnSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await klaytnSDK.ledger.customer.getAll(10)
  const updatedCustomer = await klaytnSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function klaytnLedgerOrderBookExample() {
  await klaytnSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await klaytnSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await klaytnSDK.ledger.orderBook.newTrade({
    // TODO openapi bug
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'KLAY/EUR',
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
  const trade = await klaytnSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await klaytnSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await klaytnSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await klaytnSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function klaytnLedgerTransactionExample() {
  const transactionCount = await klaytnSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await klaytnSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await klaytnSDK.ledger.transaction.getAll({})
  const transactionByAccount = await klaytnSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await klaytnSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await klaytnSDK.ledger.transaction.getAllByReference(
    '5e6be8e9e6aa436299950c41',
  )
  const transactionResult = await klaytnSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await klaytnSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function klaytnLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await klaytnSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: 'USDT',
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

  const virtualCurrency = await klaytnSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')

  const mintTx = await klaytnSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })

  const revokeTx = await klaytnSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })

  await klaytnSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    // TODO openapi bug
    basePair: 'EUR',
  })
}
