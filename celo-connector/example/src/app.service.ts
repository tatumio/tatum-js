import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'pino-logger';
import { InjectPinoLogger } from 'nestjs-pino';
import { CeloService } from '../../module';

@Injectable()
export class AppService extends CeloService {
  constructor(@InjectPinoLogger(AppService.name) logger: PinoLogger) {
    super(logger);
  }

  protected completeKMSTransaction(
    txId: string,
    signatureId: string,
  ): Promise<void> {
    return Promise.resolve();
  }

  protected getNodesUrl(testnet: boolean): Promise<string[]> {
    return Promise.resolve(['https://alfajores-forno.celo-testnet.org']);
  }

  protected isTestnet(): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected storeKMSTransaction(
    txData: string,
    currency: string,
    signatureId: string[],
  ): Promise<string> {
    return Promise.resolve(txData);
  }
}
