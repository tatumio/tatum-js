import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const algoSDK = TatumAlgoSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function algoLedgerAccountExample() {
  const account = await algoSDK.ledger.account.create({
    currency: Currency.ETH,
  })
  const accounts = await algoSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.ETH }, { currency: Currency.ETH }],
  })
  await algoSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await algoSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await algoSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await algoSDK.ledger.account.unfreeze('5e68c66581f2ee32bc354087')
  await algoSDK.ledger.account.update('5e68c66581f2ee32bc354087', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await algoSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const allAccounts = await algoSDK.ledger.account.getAll(10)
  const balance = await algoSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmounts = await algoSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await algoSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function algoLedgerBlockAmountExample() {
  const accountId = await algoSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await algoSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await algoSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function algoLedgerCustomerExample() {
  await algoSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await algoSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await algoSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await algoSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await algoSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await algoSDK.ledger.customer.getAll(10)
  const updatedCustomer = await algoSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function algoLedgerOrderBookExample() {
  await algoSDK.ledger.orderBook.cancel('7c21ed165e294db78b95f0f1')
  await algoSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')
  const newTrade = await algoSDK.ledger.orderBook.newTrade({
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
  const trade = await algoSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await algoSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await algoSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await algoSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
}

export async function algoLedgerTransactionExample() {
  const transactionCount = await algoSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomerCount = await algoSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await algoSDK.ledger.transaction.getAll({})
  const transactionByAccount = await algoSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCustomer = await algoSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await algoSDK.ledger.transaction.getAllByReference(
    '5e6be8e9e6aa436299950c41',
  )
  const transactionResult = await algoSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTransactionResult = await algoSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function algoLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await algoSDK.ledger.virtualCurrency.create({
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
  const virtualCurrency = await algoSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await algoSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await algoSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await algoSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    // TODO openapi bug
    basePair: 'USD',
  })
}
