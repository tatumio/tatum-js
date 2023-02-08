import { Container, Service } from 'typedi'
import { Nft } from '../nft/nft'
import { API_KEY } from '../../util/di.tokens'
import { Notification } from '../notification/notification'
import { Fee } from '../fee/fee'
import { TatumConnector } from '../../connector/tatum.connector'
import { ApiInfoResponse, TatumConfig } from './tatum.dto'

@Service()
export class TatumSdk {
  nft: Nft = Container.get(Nft);
  notification: Notification = Container.get(Notification);
  fee: Fee = Container.get(Fee);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getApiInfo(apiKey: string): Promise<ApiInfoResponse> {
    Container.set(API_KEY, apiKey);
    const connector = Container.get(TatumConnector);
    return connector.get({ path: 'tatum/version' });
  }

  public static async init(config: TatumConfig): Promise<TatumSdk> {
    const defaultConfig: TatumConfig = {
      validate: true,
    }

    config = { ...defaultConfig, ...config }

    if (config.apiKey && config.validate) {
      if(config.testnet === undefined) {
        throw new Error('Testnet flag is not set. Please set it to true or false.')
      }

      const { testnet } = await this.getApiInfo(config.apiKey);
      if(testnet !== config.testnet) {
        throw new Error(`Tatum API key is not valid for ${config.testnet ? 'testnet' : 'mainnet'}`);
      }
      return new TatumSdk();
    }
    return new TatumSdk();
  }
}
