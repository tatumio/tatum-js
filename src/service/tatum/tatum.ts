import { Container, Service } from 'typedi'
import { CONFIG } from '../../util/di.tokens'
import { Notification } from '../notification/notification'
import { Network, TatumConfig } from './tatum.dto'
import { v4 as uuidv4 } from 'uuid';

@Service({ transient: true })
export class TatumSdk {
  notification: Notification
  private id: string

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(id: string) {
    this.id = id
    this.notification = Container.of(this.id).get(Notification)
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
    Container.of(id).set(CONFIG, finalConfig)
    return new TatumSdk(id)
  }
}
