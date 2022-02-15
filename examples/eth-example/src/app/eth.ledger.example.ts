import { TatumEthSDK } from '@tatumio/eth'
import { Currency } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethLedgerAccountExample() {
  const account = await ethSDK.ledger.account.create({
    currency: Currency.ETH,
  })
  const accounts = await ethSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.ETH }, { currency: Currency.ETH }],
  })
  await ethSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await ethSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await ethSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await ethSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await ethSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await ethSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await ethSDK.ledger.account.getAll(10)
  const balance = await ethSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await ethSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await ethSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function ethLedgerBlockAmountExample() {
  const accountId = await ethSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await ethSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await ethSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function ethLedgerCustomerExample() {
  await ethSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await ethSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await ethSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await ethSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await ethSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await ethSDK.ledger.customer.getAll(10)
  const updatedCustomer = await ethSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function ethLedgerOrderBookExample() {
  await ethSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await ethSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await ethSDK.ledger.orderBook.newTrade({
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
  const trade = await ethSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await ethSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await ethSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await ethSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function ethLedgerTransactionExample() {
  const transactionCount = await ethSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await ethSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await ethSDK.ledger.transaction.getAll({})
  const transactionByAccount = await ethSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await ethSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await ethSDK.ledger.transaction.getAllByReference('5e6be8e9e6aa436299950c41')
  const transactionResult = await ethSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await ethSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function ethLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await ethSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: 'ETH',
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
  const virtualCurrency = await ethSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await ethSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await ethSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await ethSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    basePair: 'USD',
  })
}
