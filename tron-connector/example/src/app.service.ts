import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'pino-logger';
import { InjectPinoLogger } from 'nestjs-pino';
import { TronBlockchainService } from '../../module/npm';

@Injectable()
export class AppService extends TronBlockchainService {
  constructor(@InjectPinoLogger(AppService.name) logger: PinoLogger) {
    super(logger);
  }
  protected getNodesUrl(): Promise<string[]> {
    return Promise.resolve(['https://api.shasta.trongrid.io']);
  }

  protected isTestnet(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
