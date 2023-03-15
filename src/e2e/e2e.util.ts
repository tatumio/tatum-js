import {
  AddressBasedNotification,
  AddressBasedNotificationDetail,
  BlockBasedNotification,
  BlockBasedNotificationDetail, Chain,
  TatumSdk
} from '../service'
import {ResponseDto} from "../util";

export const e2eUtil = {
  subscriptions: {
    testAddressBasedSubscription: async <TChainEnum extends keyof typeof Chain>(
      tatum: TatumSdk,
      chain: TChainEnum,
      address: string,
      func: (addressBasedNotificationDetail: AddressBasedNotificationDetail<TChainEnum>) => Promise<ResponseDto<AddressBasedNotification<TChainEnum>>>) => {
      const url = 'https://webhook.site/'
      const { data, error } = await func({
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
    },
    testBlockBasedSubscription: async <TChainEnum extends keyof typeof Chain>(
      tatum: TatumSdk,
      chain: TChainEnum,
      func: (blockBasedNotificationDetail: BlockBasedNotificationDetail<TChainEnum>) => Promise<ResponseDto<BlockBasedNotification<TChainEnum>>>) => {
      const url = 'https://tatum.io'

      const { data, error } = await func({
        chain,
        url
      })
      await tatum.notification.unsubscribe(data.id)
      expect(error).toBeUndefined()
      expect(data.id).toBeDefined()
      expect(data.chain).toEqual(chain)
      expect(url).toBeDefined()
    }
  }
}
