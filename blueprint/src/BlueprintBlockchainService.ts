import {PinoLogger} from 'nestjs-pino';

export abstract class BlueprintBlockchainService {

  protected constructor(protected readonly logger: PinoLogger) {
  }

  // this method is used inside Tatum API to distinguish, if this is testnet or mainnet version of the service
  protected abstract isTestnet(): Promise<boolean>;

  // this method is used inside Tatum API to obtain address of the blockchain nodes to connect to
  protected abstract getNodesUrl(): Promise<string[]>;

  public async getBlockChainInfo(): Promise<any> {
    return {testnet: await this.isTestnet()};
  }

  // more methods could be implemented here
}
