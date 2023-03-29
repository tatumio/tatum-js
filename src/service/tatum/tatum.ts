import { Container, Service } from 'typedi'
import { CONFIG } from '../../util'
import { Notification } from '../notification'
import { Network, TatumConfig } from './tatum.dto'
import { v4 as uuidv4 } from 'uuid';
import { Rpc } from '../rpc'

@Service({ transient: true })
export class TatumSdk {
  notification: Notification
  rpc: Rpc
  private id: string

  private constructor(id: string) {
    this.id = id
    this.notification = Container.of(this.id).get(Notification)
    this.rpc = Container.of(this.id).get(Rpc)
  }

  public static async init(config?: TatumConfig): Promise<TatumSdk> {
    const defaultConfig: TatumConfig = {
      network: Network.Mainnet,
      verbose: false,
      retryCount: 1,
      retryDelay: 1000,
    }

    const finalConfig = { ...defaultConfig, ...config }

    const id = uuidv4()
    Container.of(id).set(CONFIG, finalConfig)
    return new TatumSdk(id)
  }
}
