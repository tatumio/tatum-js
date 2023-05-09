import { Ripple } from '../dto'
import { Network, TatumSDK } from '../service'

const getRippleRpc = async (testnet?: boolean) =>
  await TatumSDK.init<Ripple>({
    network: testnet ? Network.XRP_TESTNET : Network.XRP,
    verbose: true,
    retryCount: 1,
    retryDelay: 2000,
  })

describe('RPCs', () => {
  describe('Ripple', () => {
    describe('testnet', () => {
      it('ping', async () => {
        const tatum = await getRippleRpc(true)
        const res = await tatum.rpc.ping()
        expect(res).toBe('success')
      })
      it('ledgerCurrent', async () => {
        const tatum = await getRippleRpc()
        const res = await tatum.rpc.ledgerCurrent()
        expect(res).toBeGreaterThan(0)
      })
    })
  })
  describe('Ripple', () => {
    describe('mainnet', () => {
      it('accountChannels', async () => {
        const tatum = await getRippleRpc()
        const res = await tatum.rpc.accountChannels(
          'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
          'ra5nK24KXen9AHvsdFTKHSANinZseWnPcX',
          undefined,
          'validated',
        )
        expect(res.channels).toContainEqual({
          account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
          amount: '1000',
          balance: '0',
          channel_id: 'C7F634794B79DB40E87179A9D1BF05D05797AE7E92DF8E93FD6656E8C4BE3AE7',
          destination_account: 'ra5nK24KXen9AHvsdFTKHSANinZseWnPcX',
          public_key: 'aBR7mdD75Ycs8DRhMgQ4EMUEmBArF8SEh1hfjrT2V9DQTLNbJVqw',
          public_key_hex: '03CFD18E689434F032A4E84C63E2A3A6472D684EAF4FD52CA67742F3E24BAE81B2',
          settle_delay: 60,
        })
      })
      it('accountLines', async () => {
        const tatum = await getRippleRpc()
        const res = await tatum.rpc.accountLines('r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59')
        expect(res.lines.length).toBeGreaterThan(0)
      })
      it('norippleCheck', async () => {
        const tatum = await getRippleRpc()
        const res = await tatum.rpc.norippleCheck(
          'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
          'gateway',
          true,
          2,
          undefined,
          'current',
        )
        expect(res.problems.length).toBeGreaterThan(0)
      })
      it('ledgerClosed', async () => {
        const tatum = await getRippleRpc()
        const res = await tatum.rpc.ledgerClosed()
        expect(res.ledger_index).toBeGreaterThan(0)
      })
    })
  })
})
