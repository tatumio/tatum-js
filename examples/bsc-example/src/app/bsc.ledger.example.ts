import { CreateTrade, VirtualCurrency } from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscLedgerAccountExample() {
  const account = await bscSDK.ledger.account.create({
    currency: Currency.BSC,
  })
  const accounts = await bscSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.BSC }, { currency: Currency.BSC }],
  })
  await bscSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await bscSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await bscSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await bscSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await bscSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await bscSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await bscSDK.ledger.account.getAll(10)
  const balance = await bscSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await bscSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await bscSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function bscLedgerBlockAmountExample() {
  const accountId = await bscSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })

  const txResult = await bscSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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

  await bscSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function bscLedgerCustomerExample() {
  await bscSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await bscSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await bscSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await bscSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')
  const customer = await bscSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await bscSDK.ledger.customer.getAll(10)
  const updatedCustomer = await bscSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function bscLedgerOrderBookExample() {
  await bscSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await bscSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await bscSDK.ledger.orderBook.newTrade({
    // TODO openapi bug
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'BSC/EUR',
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
  const trade = await bscSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await bscSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })

  const activeSellTrades = await bscSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })

  const historicalTrades = await bscSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function bscLedgerTransactionExample() {
  const transactionCount = await bscSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await bscSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await bscSDK.ledger.transaction.getAll({})
  const transactionByAccount = await bscSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await bscSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await bscSDK.ledger.transaction.getAllByReference('5e6be8e9e6aa436299950c41')
  const transactionResult = await bscSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await bscSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function bscLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await bscSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    // TODO openapi bug
    basePair: 'GMC_BSC',
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

  const virtualCurrency = await bscSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')

  const mintTx = await bscSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })

  const revokeTx = await bscSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })

  await bscSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    // TODO openapi bug
    basePair: 'EUR',
  })
}
