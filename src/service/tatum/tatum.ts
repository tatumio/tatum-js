import { Container, Service } from 'typedi'
import { CONFIG } from '../../util/di.tokens'
import { Notification } from '../notification/notification'
import { TatumConnector } from '../../connector/tatum.connector'
import { ApiInfoResponse, Network, TatumConfig } from './tatum.dto'

@Service()
export class TatumSdk {
  notification: Notification = Container.get(Notification)
  private connector: TatumConnector = Container.get(TatumConnector)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
  }

  static getApiInfo(): Promise<ApiInfoResponse> {
    const connector = Container.get(TatumConnector)
    return connector.get({ path: 'tatum/version' })
  }

  getApiInfo(): Promise<ApiInfoResponse> {
    return this.connector.get({ path: 'tatum/version' })
  }

  public static async init(config?: TatumConfig): Promise<TatumSdk> {
    const defaultConfig: TatumConfig = {
      validate: true,
      network: Network.Mainnet,
    }

    const finalConfig = { ...defaultConfig, ...config }

    if (finalConfig.apiKey && finalConfig.validate) {
      Container.set(CONFIG, finalConfig)
      const { testnet } = await this.getApiInfo()
      const testnetType = testnet ? Network.Testnet : Network.Mainnet
      if (testnetType !== finalConfig.network) {
        throw new Error(`Tatum API key is not valid for ${finalConfig.network}`)
      }
      return new TatumSdk()
    }

    Container.set(CONFIG, finalConfig)
    return new TatumSdk()
  }
}
