import { TradeType } from '@tatumio/tatum-core'
import { storeTrade } from './orderBook'

describe('LEDGER TESTS: Trades test suite', () => {
  /*
  returns error validation failed
      {
      "statusCode": 400,
      "errorCode": "validation.failed",
      "message": "Request validation failed. Please see data for additional information.",
      "data": [...{}]
      }
  */
  it('should be able to trade between pairs', async () => {
    try {
      const accountObj = await storeTrade({
        type: TradeType.BUY,
        price: '8',
        amount: '15',
        pair: 'VC_demoVC/EUR',
        currency1AccountId: '603bddc9fbf47f7a279d76ca',
        currency2AccountId: '603c04950476a57888bc4d02',
        feeAccountId: '603c04950476a57888bc4d02',
        fee: 1.5,
      })
      console.log(accountObj)
    } catch (e: any) {
      // return error if any
      console.log(JSON.stringify(e.response.data))
    }
  })
  it('should fail to validate using same ids in both accounts', async () => {
    try {
      const accountObj = await storeTrade({
        type: TradeType.BUY,
        price: '8650.4',
        amount: '15000',
        pair: 'VC_demoVC/EUR',
        currency1AccountId: '603bddc9fbf47f7a279d76ca',
        currency2AccountId: '603bddc9fbf47f7a279d76ca',
        feeAccountId: '603bddc9fbf47f7a279d76ca',
        fee: 1.5,
      })
      // printing the results
      console.log(accountObj)
    } catch (e: any) {
      // return error if any
      console.log(e.response.data)
    }
  })
  it('should fail if using different ids and pair combination', async () => {
    try {
      const accountObj = await storeTrade({
        type: TradeType.BUY,
        price: '8650.4',
        amount: '15000',
        pair: 'BTC/EUR',
        currency1AccountId: '603bddc9fbf47f7a279d76ca',
        currency2AccountId: '603bddc9fbf47f7a279d76ca',
        feeAccountId: '603bddc9fbf47f7a279d76ca',
        fee: 1.5,
      })
      console.log(accountObj)
    } catch (e: any) {
      // checking negative test cases
      expect(e.response.data.statusCode).toBe(403)
      expect(e.response.data.errorCode).toBe('trade.currency1.pair')
    }
  })
})
