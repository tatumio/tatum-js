import { Network, TatumSDK, Xrp } from '../../service'

const getXrpRpc = async (testnet?: boolean) =>
  await TatumSDK.init<Xrp>({
    network: testnet ? Network.XRP_TESTNET : Network.XRP,

    retryCount: 1,
    retryDelay: 2000,
  })

describe.skip('RPCs', () => {
  afterEach(async () => {
    // wait for 200ms to avoid rate limit
    await new Promise((resolve) => setTimeout(resolve, 100))
  })

  describe('XRP', () => {
    describe('testnet', () => {
      it('ledger_current', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.ledgerCurrent()

        expect(result.ledger_current_index).toBeGreaterThan(0)
      })
      it('ping', async () => {
        const tatum = await getXrpRpc(true)
        const { result } = await tatum.rpc.ping()

        expect(result.status).toBe('success')
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

        expect(result.receive_currencies.length).toBeGreaterThan(0)
      })
      it('account_lines', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.accountLines('r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59')

        expect(result.lines.length).toBeGreaterThan(0)
      })
      it('account_info', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.accountInfo('rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn', {
          strict: true,
          ledgerIndex: 'current',
          queue: true,
        })

        expect(result.account_data.Account).toBe('rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn')
      })
      // TODO: not working in pipeline
      it.skip('account_tx', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.accountTx('rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w', {
          binary: false,
          forward: false,
          ledgerIndexMax: -1,
          ledgerIndexMin: -1,
          limit: 2,
        })

        expect(result.transactions.length).toBeGreaterThan(0)
      })
      it('noripple_check', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.norippleCheck('r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59', 'gateway', {
          transactions: true,
          limit: 2,
          ledgerIndex: 'current',
        })

        expect(result.problems.length).toBeGreaterThan(0)
      })
      it('ledger', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.ledger({
          ledgerIndex: 'validated',
          accounts: false,
          full: false,
          transactions: false,
          expand: false,
          ownerFunds: false,
        })

        expect(result.ledger.accepted).toBe(true)
      })
      it('ledger_closed', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.ledgerClosed()

        expect(result.ledger_index).toBeGreaterThan(0)
      })
      it('ledger_entry', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.ledgerEntry({
          index: '7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4',
          ledgerIndex: 'validated',
        })

        expect(result.index).toBe('7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4')
      })
      it('submit', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.submit(
          '1200002280000000240000001E61D4838D7EA4C6800000000000000000000000000055534400000000004B4E9C06F24296074F7BC48F92A97916C6DC5EA968400000000000000B732103AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB7447304502210095D23D8AF107DF50651F266259CC7139D0CD0C64ABBA3A958156352A0D95A21E02207FCF9B77D7510380E49FF250C21B57169E14E9B4ACFD314CEDC79DDD0A38B8A681144B4E9C06F24296074F7BC48F92A97916C6DC5EA983143E9D4A2B8AA0780F682D136F7A56D6724EF53754',
        )

        expect(result.tx_json.Destination).toBe('ra5nK24KXen9AHvsdFTKHSANinZseWnPcX')
      })
      it('transaction_entry', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.transactionEntry(
          'C53ECF838647FA5A4C780377025FEC7999AB4182590510CA461444B207AB74A9',
          { ledgerIndex: 56865245 },
        )

        expect(result.tx_json.TransactionType).toBe('OfferCreate')
      })
      it('tx', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.tx(
          'C53ECF838647FA5A4C780377025FEC7999AB4182590510CA461444B207AB74A9',
          {
            binary: false,
          },
        )

        expect(result.TransactionType).toBe('OfferCreate')
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

        expect(result.offers.length).toBeGreaterThan(0)
      })
      it('fee', async () => {
        const tatum = await getXrpRpc()
        const { result } = await tatum.rpc.fee()

        expect(result.ledger_current_index).toBeGreaterThan(0)
      })
    })
  })
})
