import { Injectable } from '@nestjs/common';
import { ScryptaBlockchainService } from '../../module/npm';
import { PinoLogger } from 'pino-logger';
import { InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class AppService extends ScryptaBlockchainService {
  constructor(@InjectPinoLogger(AppService.name) logger: PinoLogger) {
    super(logger);
  }
  protected getNodesUrl(): Promise<string[]> {
    return Promise.resolve(['https://idanodejs01.scryptachain.org']);
  }

  protected isTestnet(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
