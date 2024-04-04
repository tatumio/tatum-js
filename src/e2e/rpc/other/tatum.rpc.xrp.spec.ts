import { Network, TatumSDK, Xrp } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getXrpRpc = async (testnet?: boolean) =>
  await TatumSDK.init<Xrp>(e2eUtil.initConfig(testnet ? Network.XRP_TESTNET : Network.XRP))

describe.skip('RPCs', () => {
  describe('XRP', () => {
    describe('testnet', () => {
      it('ping', async () => {
        const tatum = await getXrpRpc(true)
        const { result } = await tatum.rpc.ping()
        await tatum.destroy()
        expect(result.status).toBe('success')
      })

      it('ledger_closed', async () => {
        const tatum = await getXrpRpc(true)
        const { result } = await tatum.rpc.ledgerClosed()
        await tatum.destroy()
        expect(result.ledger_index).toBeGreaterThan(0)
      })

      it('fee', async () => {
        const tatum = await getXrpRpc(true)
        const { result } = await tatum.rpc.fee()
        await tatum.destroy()
        expect(result.ledger_current_index).toBeGreaterThan(0)
      })
    })
  })
  describe('XRP', () => {
    describe('mainnet', () => {
      it('account_channels', async () => {
        const tatum = await getXrpRpc()
        const result = await tatum.rpc.accountChannels('rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn', {
          destinationAccount: 'ra5nK24KXen9AHvsdFTKHSANinZseWnPcX',
          ledgerIndex: 'validated',
        })
        await tatum.destroy()
        expect(result.result.channels).toContainEqual({
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

      it('account_currencies', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.accountCurrencies('r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59', {
          ledgerIndex: 'validated',
          strict: true,
        })
        await tatum.destroy()
        expect(result.receive_currencies.length).toBeGreaterThan(0)
      })

      it('account_lines', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.accountLines('r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59')
        await tatum.destroy()
        expect(result.lines.length).toBeGreaterThan(0)
      })

      it('account_info', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.accountInfo('rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn', {
          strict: true,
          ledgerIndex: 'current',
          queue: true,
        })
        await tatum.destroy()
        expect(result.account_data.Account).toBe('rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn')
      })

      it('noripple_check', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.norippleCheck('r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59', 'gateway', {
          transactions: true,
          limit: 2,
          ledgerIndex: 'current',
        })
        await tatum.destroy()
        expect(result.problems.length).toBeGreaterThan(0)
      })

      it('ledger_closed', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.ledgerClosed()
        await tatum.destroy()
        expect(result.ledger_index).toBeGreaterThan(0)
      })

      it('ledger_entry', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.ledgerEntry({
          index: '7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4',
          ledgerIndex: 'validated',
        })
        await tatum.destroy()
        expect(result.index).toBe('7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4')
      })

      it('submit', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.submit(
          '1200002280000000240000001E61D4838D7EA4C6800000000000000000000000000055534400000000004B4E9C06F24296074F7BC48F92A97916C6DC5EA968400000000000000B732103AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB7447304502210095D23D8AF107DF50651F266259CC7139D0CD0C64ABBA3A958156352A0D95A21E02207FCF9B77D7510380E49FF250C21B57169E14E9B4ACFD314CEDC79DDD0A38B8A681144B4E9C06F24296074F7BC48F92A97916C6DC5EA983143E9D4A2B8AA0780F682D136F7A56D6724EF53754',
        )
        await tatum.destroy()
        expect(result.tx_json.Destination).toBe('ra5nK24KXen9AHvsdFTKHSANinZseWnPcX')
      })

      it('book_offers', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.bookOffers(
          {
            currency: 'XRP',
          },
          {
            currency: 'USD',
            issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
          },
          { taker: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59', limit: 10 },
        )
        await tatum.destroy()
        expect(result.offers.length).toBeGreaterThan(0)
      })

      it('fee', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.fee()
        await tatum.destroy()
        expect(result.ledger_current_index).toBeGreaterThan(0)
      })
    })
  })
})
