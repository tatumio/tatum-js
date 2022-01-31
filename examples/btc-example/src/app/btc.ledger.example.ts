import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Currency } from '@tatumio/shared-core'
import { CreateTrade, VirtualCurrency } from '@tatumio/api-client'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function btcLedgerAccountsExample() {
  const account = await btcSDK.ledger.account.create({
    currency: Currency.BTC,
  })
  await btcSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await btcSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.BTC }, { currency: Currency.BTC }],
  })
  await btcSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await btcSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await btcSDK.ledger.account.unfreeze('5e6be89ee6aa436299950c3f')
  await btcSDK.ledger.account.update('5e6be89ee6aa436299950c3f', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await btcSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const accounts = await btcSDK.ledger.account.getAll(10)
  const balance = await btcSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmount = await btcSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await btcSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}

export async function btcLedgerBlockAmountExample() {
  const accountId = await btcSDK.ledger.blockAmount.block('5e6be89ee6aa436299950c3f', {
    amount: '5',
    type: 'DEBIT_CARD_OP',
    description: 'Card payment in the shop.',
  })
  const txResult = await btcSDK.ledger.blockAmount.unblockWithTransaction('5e6be89ee6aa436299950c3f', {
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
  await btcSDK.ledger.blockAmount.unblock('5e6be89ee6aa436299950c3f')
}

export async function btcLedgerCustomerExample() {
  await btcSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await btcSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await btcSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await btcSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await btcSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await btcSDK.ledger.customer.getAll(10)
  const updatedCustomer = await btcSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}

export async function btcLedgerOrderBookExample() {
  await btcSDK.ledger.orderBook.cancel('5e68c66581f2ee32bc354087')
  await btcSDK.ledger.orderBook.cancelByAccount('5e68c66581f2ee32bc354087')

  const trade = await btcSDK.ledger.orderBook.get('7c21ed165e294db78b95f0f1')
  const activeBuyTrades = await btcSDK.ledger.orderBook.getActiveBuyTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const activeSellTrades = await btcSDK.ledger.orderBook.getActiveSellTrades({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const historicalTrades = await btcSDK.ledger.orderBook.getHistorical({
    id: '7c21ed165e294db78b95f0f1',
    customerId: '5e68c66581f2ee32bc354087',
    pageSize: 10,
  })
  const newTrade = await btcSDK.ledger.orderBook.newTrade({
    type: 'BUY',
    price: '8650.4',
    amount: '15000',
    pair: 'BTC/EUR',
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

export async function btcLedgerTransactionExample() {
  const transaction = await btcSDK.ledger.transaction.countByAccount({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByCustomer = await btcSDK.ledger.transaction.countByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactions = await btcSDK.ledger.transaction.getAll({})

  const transactionByAccount = await btcSDK.ledger.transaction.getAllByAccount({
    id: '5e6645712b55823de7ea82f1',
  })
  const transactionByCUstomer = await btcSDK.ledger.transaction.getAllByCustomer({
    id: '5e6be8e9e6aa436299950c41',
  })
  const transactionByReference = await btcSDK.ledger.transaction.getAllByReference('5e6be8e9e6aa436299950c41')
  const transactionResult = await btcSDK.ledger.transaction.send({
    senderAccountId: '5e6645712b55823de7ea82f1',
    recipientAccountId: '5e6645712b55823de7ea82f2',
    amount: '5',
  })
  const batchTxResult = await btcSDK.ledger.transaction.sendMultiple({
    senderAccountId: '5e6645712b55823de7ea82f1',
    transaction: [
      {
        recipientAccountId: '5e6645712b55823de7ea82f2',
        amount: '5',
      },
    ],
  })
}

export async function btcLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await btcSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: 'BTC',
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
  const virtualCurrency = await btcSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await btcSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await btcSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await btcSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    basePair: 'EUR',
  })
}
