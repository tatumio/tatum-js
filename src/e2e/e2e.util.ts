import {
  AddressBasedNotification,
  AddressBasedNotificationDetail,
  BlockBasedNotification,
  BlockBasedNotificationDetail,
  ContractBasedNotification,
  ContractBasedNotificationDetail,
  FullSdk,
  Network,
  NotificationSubscription,
  RpcNodeType,
  TatumConfig,
} from '../service'
import { ResponseDto } from '../util'
import { NetworkUtils } from '../util/network.utils'

export const e2eUtil = {
  initConfig: (network: Network, apiKey?: string, url?: string) => {
    const config: TatumConfig = {
      network,
      verbose: e2eUtil.isVerbose,
      retryCount: 5,
      retryDelay: 2000,
      apiKey: {
        v4: apiKey ?? NetworkUtils.getV4ApiKeyForNetwork(network),
      },
    }

    if (url) {
      config.rpc = {
        nodes: [{ url: url, type: RpcNodeType.NORMAL }],
      }
    }
    return config
  },
  subscriptions: {
    getAddress: (network: Network): string => {
      switch (network) {
        case Network.ETHEREUM_SEPOLIA:
        case Network.ETHEREUM_HOLESKY:
        case Network.ETHEREUM_HOODI:
        case Network.FLARE:
        case Network.FLARE_COSTON:
        case Network.FLARE_COSTON_2:
        case Network.FLARE_SONGBIRD:
        case Network.CRONOS:
        case Network.CRONOS_TESTNET:
        case Network.BASE:
        case Network.BASE_SEPOLIA:
        case Network.AVALANCHE_C:
        case Network.AVALANCHE_C_TESTNET:
        case Network.FANTOM:
        case Network.FANTOM_TESTNET:
        case Network.OPTIMISM:
        case Network.OPTIMISM_TESTNET:
        case Network.BERACHAIN_MAINNET:
          return '0xdb4C3b4350EE869F2D0a2F43ce0292865E2Aa149'
        case Network.CELO_ALFAJORES:
          return '0xdf083B077F1FD890fC71feCaBbd3F68F94cD21Bf'
        case Network.POLYGON_AMOY:
          return '0xcf3c930601111c216fc0232d32cf5c2a86f107da'
        case Network.KLAYTN_BAOBAB:
          return '0xdc7Dfb8Aa86D41b7e39441711Fe1669f2d843C06'
        case Network.BINANCE_SMART_CHAIN_TESTNET:
          return '0xddde2061b144Be4b5921eE1F1Cd2Db4eDC9AE6aA'
        case Network.SOLANA_DEVNET:
          return 'GwzBgrXb4PG59zjce24SF2b9JXbLEjJJTBkmytuEZj1b'
        case Network.TRON_SHASTA:
          return 'TLduuX5NWFucPPafLbj9eab6Znwrdm72Qv'
        case Network.BITCOIN_TESTNET:
          return 'tb1q0w3g78u9uwwpf94m3jtqen3neyge5g7y20w8mt'
        case Network.BITCOIN_CASH_TESTNET:
          return 'bchtest:qp495cqlv22676su9hllwy58unawwsmnfvztn0p0t6'
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
          return '5U3bH5b6XtG99aVWLqwVzYPVpQiFHytBD68Rz2eFPZd7'
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
        case Network.TEZOS:
          return 'tz1T8S68igxa6uWZbeoWWwbcuRHEDQSzknEX'
        default:
          throw new Error(`Network ${network} not supported`)
      }
    },
    testAddressBasedSubscription: async (
      tatum: FullSdk,
      address: string,
      func: (
        addressBasedNotificationDetail: AddressBasedNotificationDetail,
      ) => Promise<ResponseDto<AddressBasedNotification>>,
    ) => {
      await e2eUtil.flushSubscriptions(tatum)
      const url = 'https://webhook.site/'
      const { data, error } = await func({
        url,
        address,
      })
      if (error) {
        await tatum.destroy()
        throw new Error(error.message.join(','))
      }

      expect(data.id).toBeDefined()
      await tatum.notification.unsubscribe(data.id)
      expect(error).toBeUndefined()
      expect(data.address.toLowerCase()).toEqual(address.toLowerCase())
      expect(url).toBeDefined()
      await tatum.destroy()
      return data.id
    },
    testContractBasedSubscription: async (
      tatum: FullSdk,
      contractAddress: string,
      func: (
        contractBasedNotificationDetail: ContractBasedNotificationDetail,
      ) => Promise<ResponseDto<ContractBasedNotification>>,
    ) => {
      await e2eUtil.flushSubscriptions(tatum)
      const url = 'https://webhook.site/'
      const event = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
      const { data, error } = await func({
        url,
        contractAddress,
        event,
      })

      console.log(data)
      console.log(error)

      if (error) {
        throw new Error(error.message.join(','))
      }

      expect(data.id).toBeDefined()
      await tatum.notification.unsubscribe(data.id)
      expect(error).toBeUndefined()
      expect(data.contractAddress.toLowerCase()).toEqual(contractAddress.toLowerCase())
      expect(url).toBeDefined()
      await tatum.destroy()
    },
    testBlockBasedSubscription: async (
      tatum: FullSdk,
      func: (
        blockBasedNotificationDetail: BlockBasedNotificationDetail,
      ) => Promise<ResponseDto<BlockBasedNotification>>,
    ) => {
      await e2eUtil.flushSubscriptions(tatum)
      const url = 'https://webhook.site/'

      const { data, error } = await func({
        url,
      })
      await tatum.notification.unsubscribe(data.id)
      expect(error).toBeUndefined()
      expect(data.id).toBeDefined()
      expect(url).toBeDefined()
      await tatum.destroy()
    },
  },
  isVerbose: process.env.E2E_VERBOSE === 'true',
  flushSubscriptions: async (tatum: FullSdk) => {
    try {
      const notifications = await tatum.notification.getAll()

      if (notifications?.data?.length > 0) {
        for (const notification of notifications.data as NotificationSubscription[]) {
          await tatum.notification.unsubscribe(notification.id)
        }
      }
    } catch (e) {
      console.error('Error flushing subscriptions')
      console.error(e)
    }
  },
}
