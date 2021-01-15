import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'pino-logger';
import { InjectPinoLogger } from 'nestjs-pino';
import { TronService } from '../../module/npm';

@Injectable()
export class AppService extends TronService {
  constructor(@InjectPinoLogger(AppService.name) logger: PinoLogger) {
    super(logger);
  }
  protected getNodesUrl(testnet: boolean): Promise<string[]> {
    return Promise.resolve(['https://api.shasta.trongrid.io']);
  }

  protected isTestnet(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
