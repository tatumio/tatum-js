import { Chain, TatumSdk } from '../service'

export const e2eUtil = {
  subscriptions: {
    testCreateSubscription: async (tatum: TatumSdk, chain: Chain, address: string) => {
      const url = 'https://tatum.io'
      const { data, error } = await tatum.notification.subscribe.addressEvent({
        url,
        chain,
        address,
      })
      await tatum.notification.unsubscribe(data.id)
      expect(error).toBeUndefined()
      expect(data.id).toBeDefined()
      expect(data.chain).toEqual(chain)
      expect(data.address.toLowerCase()).toEqual(address.toLowerCase())
      expect(url).toBeDefined()
    }
  }
}
