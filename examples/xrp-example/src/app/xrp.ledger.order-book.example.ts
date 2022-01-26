import { TatumXrpSDK } from '@tatumio/xrp'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { CreateTrade } from '@tatumio/api-client'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpLedgerOrderBookExample() {
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
