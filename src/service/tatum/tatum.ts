import { Container, Service } from 'typedi'
import { Nft } from '../nft/nft'
import { CONFIG } from '../../util/di.tokens'
import { Notification } from '../notification/notification'
import { Fee } from '../fee/fee'
import { TatumConnector } from '../../connector/tatum.connector'
import { ApiInfoResponse, TatumConfig } from './tatum.dto'

@Service()
export class TatumSdk {
  nft: Nft = Container.get(Nft)
  notification: Notification = Container.get(Notification)
  fees: Fee = Container.get(Fee)
  connector: TatumConnector = Container.get(TatumConnector)

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
      testnet: false,
    }

    const finalConfig = { ...defaultConfig, ...config }

    if (finalConfig.apiKey && finalConfig.validate) {
      if (config?.testnet === undefined) {
        throw new Error('Testnet flag is required when apiKey is set. Please set it to true or false.')
      }
      Container.set(CONFIG, finalConfig)
      const { testnet } = await this.getApiInfo()
      if (testnet !== finalConfig.testnet) {
        throw new Error(`Tatum API key is not valid for ${finalConfig.testnet ? 'testnet' : 'mainnet'}`)
      }
      return new TatumSdk()
    }

    Container.set(CONFIG, finalConfig)
    return new TatumSdk()
  }
}
