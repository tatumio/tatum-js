import { Container, Service } from 'typedi'
import { CONFIG, Utils } from '../../util'
import { Address } from '../address'
import { Nft } from '../nft'
import { Notification } from '../notification'
import { ApiVersion, TatumConfig } from './tatum.dto'

@Service({ transient: true })
export class TatumSDK<T> {
  notification: Notification
  nft: Nft
  address: Address
  rpc: T

  private constructor(private readonly id: string) {
    this.notification = Container.of(id).get(Notification)
    this.nft = Container.of(id).get(Nft)
    this.address = Container.of(id).get(Address)
    this.rpc = Utils.getRpc<T>(this.id, Container.of(id).get(CONFIG).network)
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
