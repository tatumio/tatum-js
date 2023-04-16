import {
  AddressBasedNotification,
  AddressBasedNotificationDetail,
  BlockBasedNotification,
  BlockBasedNotificationDetail,
  Network,
  TatumSDK,
} from '../service'
import { ResponseDto } from '../util'

export const e2eUtil = {
  subscriptions: {
    getAddress: (network: Network): string => {
      switch (network) {
        case Network.ETHEREUM_SEPOLIA:
          return '0xdb4C3b4350EE869F2D0a2F43ce0292865E2Aa149'
        case Network.CELO_ALFAJORES:
          return '0xdf083B077F1FD890fC71feCaBbd3F68F94cD21Bf'
        case Network.POLYGON_MUMBAI:
          return '0xd608d48c6ddB41254d73ec0619FE31B254Fb5ab8'
        case Network.KLAYTN_BAOBAB:
          return '0xdc7Dfb8Aa86D41b7e39441711Fe1669f2d843C06'
        case Network.BINANCE_SMART_CHAIN_TESTNET:
          return '0xddde2061b144Be4b5921eE1F1Cd2Db4eDC9AE6aA'
        case Network.SOLANA_DEVNET:
          return '53U8WBbpjfwMprZ9YQr5frU5DtY1gNRBwzxkcPHtxQP8'
        case Network.TRON_SHASTA:
          return 'TLduuX5NWFucPPafLbj9eab6Znwrdm72Qv'
        case Network.BITCOIN_TESTNET:
          return 'tb1q0w3g78u9uwwpf94m3jtqen3neyge5g7y20w8mt'
        case Network.BITCOIN_CASH_TESTNET:
          return 'qz3yu2m8dzwrw5uc85a5pz78dyxnrvdhf5v8tlf8jd'
        case Network.XRP:
        case Network.XRP_TESTNET:
          return 'rpnU81snz763qoXiHwnonsuTpDNwemL6yu'
        case Network.LITECOIN_TESTNET:
          return 'mo6gPn3Ri2c8twJGTxMX8L5p46jjYip5fT'
        case Network.DOGECOIN_TESTNET:
          return 'npMHRfj9bdR7bBdQe7RNQNK1QM2nRAN8Sh'
        case Network.ETHEREUM:
          return '0xd6B4Dfd10441c15e0D95a2Bce023b4F002634c72'
        case Network.CELO:
          return '0xd5f3B4e29A6f2263a9e3F6518309C78d73E407d4'
        case Network.POLYGON:
          return '0xdbFad06Aa5cC4a5EDB88ee63A515F8Cc31C7cA52'
        case Network.KLAYTN:
          return '0xd8Dc7359aF648462f13e8207aff04559271DD791'
        case Network.BINANCE_SMART_CHAIN:
          return '0x9b38ffbac4acb7a9fd15a7b3bbab5796724166ef'
        case Network.SOLANA:
          return '53U8WBbpjfwMprZ9YQr5frU5DtY1gNRBwzxkcPHtxQP8'
        case Network.TRON:
          return 'TLduuX5NWFucPPafLbj9eab6Znwrdm72Qv'
        case Network.BITCOIN:
          return 'bc1qrkh27xvmekrqelnhuajfsw2ksxxwh6dnxxcpsc'
        case Network.BITCOIN_CASH:
          return 'qz3yu2m8dzwrw5uc85a5pz78dyxnrvdhf5v8tlf8jd'
        case Network.LITECOIN:
          return 'LSNjqFj7ddawFb2tiykRwKUPNDFbPsAVro'
        case Network.DOGECOIN:
          return 'DKckW1iwr2tgCaLXPThMAXnPu7gbMJqBx5'
        default:
          throw new Error(`Network ${network} not supported`)
      }
    },
    testAddressBasedSubscription: async (
      tatum: TatumSDK<unknown>,
      address: string,
      func: (
        addressBasedNotificationDetail: AddressBasedNotificationDetail,
      ) => Promise<ResponseDto<AddressBasedNotification>>,
    ) => {
      const url = 'https://webhook.site/'
      const { data, error } = await func({
        url,
        address,
      })
      console.log(data)
      await tatum.notification.unsubscribe(data.id)
      expect(error).toBeUndefined()
      expect(data.id).toBeDefined()
      expect(data.address.toLowerCase()).toEqual(address.toLowerCase())
      expect(url).toBeDefined()
    },
    testBlockBasedSubscription: async (
      tatum: TatumSDK<unknown>,
      func: (
        blockBasedNotificationDetail: BlockBasedNotificationDetail,
      ) => Promise<ResponseDto<BlockBasedNotification>>,
    ) => {
      const url = 'https://webhook.site/'

      const { data, error } = await func({
        url,
      })
      console.log(data)
      await tatum.notification.unsubscribe(data.id)
      expect(error).toBeUndefined()
      expect(data.id).toBeDefined()
      expect(url).toBeDefined()
    },
  },
}
