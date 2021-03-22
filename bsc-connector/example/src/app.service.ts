import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'pino-logger';
import { InjectPinoLogger } from 'nestjs-pino';
import { BscService } from '../../module';

@Injectable()
export class AppService extends BscService {
  constructor(@InjectPinoLogger(AppService.name) logger: PinoLogger) {
    super(logger);
  }
  protected getNodesUrl(testnet: boolean): Promise<string[]> {
    return Promise.resolve([
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
    ]);
  }

  protected isTestnet(): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected async storeKMSTransaction(
    txData: string,
    currency: string,
    signatureId: string[],
  ): Promise<string> {
    this.logger.info(txData);
    return txData;
  }

  protected completeKMSTransaction(
    txId: string,
    signatureId: string,
  ): Promise<void> {
    this.logger.info(txId);
    return Promise.resolve();
  }
}
