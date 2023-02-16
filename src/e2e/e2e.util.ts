import { Chain, TatumSdk } from '../service'

export const e2eUtil = {
  subscriptions: {
    testCreateSubscription: async (tatum: TatumSdk, chain: Chain, address: string) => {
      const url = 'https://tatum.io'
      const { data } = await tatum.notification.subscribe.addressTransaction({
        url,
        chain,
        address,
      })
      await tatum.notification.unsubscribe(data.id)
      expect(data.id).toBeDefined()
      expect(data.chain).toEqual(chain)
      expect(data.address.toLowerCase()).toEqual(address.toLowerCase())
      expect(url).toBeDefined()
    }
  }
}
