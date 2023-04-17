import { Container, Service } from 'typedi'
import { Network } from '../../dto'
import { CONFIG } from '../../util'
import { Notification } from '../notification'
import { EvmBasedRpc, GenericRpc, UtxoBasedRpc } from '../rpc'
import { ApiVersion, TatumConfig } from './tatum.dto'
import { Nft } from '../nft'

@Service({ transient: true })
export class TatumSDK<T> {
  notification: Notification
  nft: Nft
  rpc: T

  private constructor(private readonly id: string) {
    this.notification = Container.of(id).get(Notification)
    this.nft = Container.of(id).get(Nft)
    this.rpc = this.createRpc<T>(Container.of(id).get(CONFIG).network)
  }

  private createRpc<T>(network: Network): T {
    switch (network) {
      case Network.BITCOIN:
      case Network.BITCOIN_TESTNET:
      case Network.BITCOIN_CASH:
      case Network.BITCOIN_CASH_TESTNET:
      case Network.LITECOIN:
      case Network.LITECOIN_TESTNET:
      case Network.DOGECOIN:
      case Network.DOGECOIN_TESTNET:
        return Container.of(this.id).get(UtxoBasedRpc) as T
      case Network.ETHEREUM:
      case Network.ETHEREUM_SEPOLIA:
      case Network.ETHEREUM_CLASSIC:
      case Network.ETHEREUM_GOERLI:
      case Network.AVALANCHE_C:
      case Network.AVALANCHE_C_TESTNET:
      case Network.POLYGON:
      case Network.POLYGON_MUMBAI:
      case Network.GNOSIS:
      case Network.GNOSIS_TESTNET:
      case Network.FANTOM:
      case Network.FANTOM_TESTNET:
      case Network.AURORA:
      case Network.AURORA_TESTNET:
      case Network.CELO:
      case Network.CELO_ALFAJORES:
      case Network.BINANCE_SMART_CHAIN:
      case Network.BINANCE_SMART_CHAIN_TESTNET:
      case Network.VECHAIN:
      case Network.VECHAIN_TESTNET:
      case Network.XDC:
      case Network.XDC_TESTNET:
      case Network.PALM:
      case Network.PALM_TESTNET:
      case Network.CRONOS:
      case Network.CRONOS_TESTNET:
      case Network.KUCOIN:
      case Network.KUCOIN_TESTNET:
      case Network.OASIS:
      case Network.OASIS_TESTNET:
      case Network.OPTIMISM:
      case Network.OPTIMISM_TESTNET:
      case Network.HARMONY_ONE_SHARD_0:
      case Network.HARMONY_ONE_TESTNET_SHARD_0:
      case Network.KLAYTN:
      case Network.KLAYTN_BAOBAB:
        return Container.of(this.id).get(EvmBasedRpc) as T
      default:
        console.warn(`RPC Network ${network} is not supported.`)
        return Container.of(this.id).get(GenericRpc) as T
    }
  }

  /**
   * Initialize Tatum SDK. This method must be called before any other method.
   * Default configuration is used if no configuration is provided.
   * @param config
   */
  public static async init<T>(config: TatumConfig): Promise<TatumSDK<T>> {
    const defaultConfig: TatumConfig = {
      verbose: false,
      version: ApiVersion.V2,
      retryCount: 1,
      retryDelay: 1000,
      ...config,
    }

    const id = TatumSDK.generateRandomString()
    Container.of(id).set(CONFIG, defaultConfig)
    return new TatumSDK<T>(id)
  }

  private static generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 60; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
}
