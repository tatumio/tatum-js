import { Container, Service } from 'typedi'
import { CONFIG, Constant } from '../../util'
import { Notification } from '../notification'
import { Network, TatumConfig } from './tatum.dto'
import { Rpc } from '../rpc'
import { webcrypto } from 'crypto'

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
      rpc: {
        ignoreLoadBalancing: false,
        oneTimeLoadBalancing: false,
        waitForFastestNode: false,
        allowedBlocksBehind: Constant.OPEN_RPC.ALLOWED_BLOCKS_BEHIND,
      },
    }

    const finalConfig = { ...defaultConfig, ...config }
    const id = TatumSdk.generateRandomString()
    Container.of(id).set(CONFIG, finalConfig)
    const tatumSdk = new TatumSdk(id)
    await tatumSdk.rpc.init()
    return tatumSdk
  }

  private static generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const buffer = webcrypto.getRandomValues(new Uint8Array(40))
    for (let i = 0; i < 40; i++) {
      result += characters.charAt(buffer[i] % characters.length);
    }
    return result;
  }
}
