import { TatumSdk } from '../service/tatum/tatum'
import { Chain } from '../service/tatum/tatum.dto'
import { AddressTransactionNotification } from '../service/notification/notification.dto'

describe('notification',  () => {
  let tatum: TatumSdk
  beforeAll(async () => {
    tatum = await TatumSdk.init({
      apiKey: process.env.TESTNET_API_KEY,
      testnet: true,
    })
  })

  it('createSubscription', async () => {
      const response = await tatum.notification.subscribe.addressTransaction({
        url: 'https://tatum.io',
        chain: Chain.ethereum,
        address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
      })
      expect(response.id).toBeDefined()
      expect(response.chain).toBeDefined()
      expect(response.address).toBeDefined()
      expect(response.url).toBeDefined()
  })

  it('deleteSubscription', async () => {
    const { addressTransactions } = await tatum.notification.getAll()
    const subscription = addressTransactions.find(s => s.chain === Chain.ethereum && s.address.toLowerCase() === '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F'.toLowerCase()) as AddressTransactionNotification
    await tatum.notification.unsubscribe(subscription.id)
  })

  it('getAll', async () => {
    const { addressTransactions } = await tatum.notification.getAll()
    expect(addressTransactions[0].id).toBeDefined()
    expect(addressTransactions[0].chain).toBeDefined()
    expect(addressTransactions[0].address).toBeDefined()
    expect(addressTransactions[0].url).toBeDefined()
    expect(addressTransactions[0].type).toBeDefined()
    expect(addressTransactions.length).toBeGreaterThan(0)
  })
})
