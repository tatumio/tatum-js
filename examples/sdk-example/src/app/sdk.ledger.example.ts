import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Currency } from '@tatumio/shared-core'
import { CreateTrade, VirtualCurrency } from '@tatumio/api-client'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ledgerAccountsExample() {
  const account = await tatumSDK.ledger.account.create({
    currency: Currency.BTC,
  })

  const updated = await tatumSDK.ledger.account.update(account.id, {
    accountCode: 'new code',
  })

  await tatumSDK.ledger.account.freeze(account.id)

  await tatumSDK.ledger.account.unfreeze(account.id)

  const blockage = await tatumSDK.ledger.blockAmount.block(account.id, {
    amount: '10',
    description: 'new debt',
    type: 'DEBT',
  })

  await tatumSDK.ledger.blockAmount.unblock(blockage.id!) // @TODO OPENAPI should be not nullable
}

export async function ledgerCustomerExample() {
  const customers = await tatumSDK.ledger.customer.getAll(50) // @TODO OPENAPI make pageSize optional
  const customer = await tatumSDK.ledger.customer.get('customer_id')

  await tatumSDK.ledger.customer.disable(customer.id)
  await tatumSDK.ledger.customer.enable(customer.id)

  await tatumSDK.ledger.customer.deactivate(customer.id)
  await tatumSDK.ledger.customer.activate(customer.id)

  await tatumSDK.ledger.customer.update(customer.id, {
    externalId: 'new external id',
  })
}

export async function ledgerOrderBookExample() {
  // @TODO create accounts here
  const { id } = await tatumSDK.ledger.orderBook.newTrade({
    type: CreateTrade.type.BUY,
    price: '8650.4',
    amount: '15000',
    pair: 'VC_demoVC/EUR',
    currency1AccountId: '603bddc9fbf47f7a279d76ca',
    currency2AccountId: '603bddc9fbf47f7a279d76ca',
    feeAccountId: '603bddc9fbf47f7a279d76ca',
    fee: 1.5,
    // @TODO OPENAPI should be optional?
    attr: {
      sealDate: Date.now(),
    },
  })

  const trades = await tatumSDK.ledger.orderBook.getHistorical({
    pageSize: 50, // @TODO OPENAPI should be optional
  })

  const buyTrades = await tatumSDK.ledger.orderBook.getActiveBuyTrades({
    pageSize: 50, // @TODO OPENAPI should be optional
  })

  const sellTrades = await tatumSDK.ledger.orderBook.getActiveSellTrades({
    pageSize: 50, // @TODO OPENAPI should be optional
  })

  await tatumSDK.ledger.orderBook.cancel(id!)

  await tatumSDK.ledger.orderBook.cancelByAccount('account id')
}

export async function ledgerTransactionExample() {
  const transactions = await tatumSDK.ledger.transaction.getAll({
    account: 'account',
  })

  const transactionsByAccount = await tatumSDK.ledger.transaction.getAllByAccount({
    id: 'account id',
  })

  const transactionsByCustomer = await tatumSDK.ledger.transaction.getAllByCustomer({
    id: 'customer id',
  })

  const { reference } = await tatumSDK.ledger.transaction.send({
    senderAccountId: '603bddc9fbf47f7a279d76ca',
    recipientAccountId: '603c04950476a57888bc4d02',
    amount: '6',
    anonymous: false,
    compliant: false,
    transactionCode: '1_01_EXTERNAL_CODE',
    paymentId: '9625',
    recipientNote: 'Private note',
    baseRate: 1,
    senderNote: 'Sender note',
  })

  const transactionsByReference = await tatumSDK.ledger.transaction.getAllByReference(reference!) // @TODO OPENAPI reference should be not null

  const references = await tatumSDK.ledger.transaction.sendMultiple({
    senderAccountId: '603bddc9fbf47f7a279d76ca',
    transaction: [
      {
        recipientAccountId: '603c04950476a57888bc4d02',
        amount: '6',
        anonymous: false,
        compliant: false,
        transactionCode: '1_01_EXTERNAL_CODE',
        paymentId: '9625',
        recipientNote: 'Private note',
        baseRate: 1,
        senderNote: 'Sender note',
      },
    ],
  })
}
export async function ledgerVirtualCurrencyExample() {
  const account = await tatumSDK.ledger.virtualCurrency.create({
    name: 'VC_demoVC',
    supply: '1000000',
    basePair: VirtualCurrency.basePair.EUR, // @TODO OPENAPI will be extracted
    baseRate: 1,
    customer: {
      accountingCurrency: VirtualCurrency.accountingCurrency.USD,
      externalId: '12',
    },
    description: 'My Virtual Token description.',
    accountCode: 'AC_102131_B',
  })

  await tatumSDK.ledger.virtualCurrency.update({
    name: 'new name',
  })

  const mintResult = await tatumSDK.ledger.virtualCurrency.mint({
    amount: '50',
    accountId: account.id,
  })

  const revokeResult = await tatumSDK.ledger.virtualCurrency.revoke({
    accountId: account.id,
    amount: '10',
  })
}
