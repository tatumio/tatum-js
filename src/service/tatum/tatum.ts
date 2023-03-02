import { Container, Service } from 'typedi'
import { CONFIG } from '../../util/di.tokens'
import { Notification } from '../notification/notification'
import { TatumConnector } from '../../connector/tatum.connector'
import { ApiInfoResponse, Network, TatumConfig } from './tatum.dto'
import { ErrorUtils, ResponseDto, Status } from '../../util'
import { v4 as uuidv4 } from 'uuid';

@Service({ transient: true })
export class TatumSdk {
  notification: Notification
  private connector: TatumConnector
  private id: string

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(id: string) {
    this.id = id
    this.connector = Container.of(this.id).get(TatumConnector)
    this.notification = Container.of(this.id).get(Notification)
  }

  static getApiInfo(id: string): Promise<ResponseDto<ApiInfoResponse>> {
    return ErrorUtils.tryFail(async () => {
      const connector = Container.of(id).get(TatumConnector)
      return connector.get({ path: 'tatum/version' })
    })
  }

  getApiInfo(): Promise<ResponseDto<ApiInfoResponse>> {
    return ErrorUtils.tryFail(async () => {
      return this.connector.get({ path: 'tatum/version' })
    })
  }

  public static async init(config?: TatumConfig): Promise<TatumSdk> {
    const defaultConfig: TatumConfig = {
      validate: true,
      network: Network.Mainnet,
      debug: false,
      retryCount: 5,
      retryDelay: 1000,
    }

    const finalConfig = { ...defaultConfig, ...config }

    const id = uuidv4()

    if (finalConfig.apiKey && finalConfig.validate) {
      Container.of(id).set(CONFIG, finalConfig)
      const { data, status, error } = await this.getApiInfo(id)

      if (status === Status.ERROR) {
        throw new Error(error?.message[0].toString())
      }

      const testnetType = data.testnet ? Network.Testnet : Network.Mainnet
      if (testnetType !== finalConfig.network) {
        throw new Error(`Tatum API key is not valid for ${finalConfig.network}`)
      }
      return new TatumSdk(id)
    }

    Container.of(id).set(CONFIG, finalConfig)
    return new TatumSdk(id)
  }
}
