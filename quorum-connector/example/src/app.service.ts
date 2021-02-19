import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'pino-logger';
import { InjectPinoLogger } from 'nestjs-pino';
import { QuorumService } from '../../module/npm';

@Injectable()
export class AppService extends QuorumService {
  constructor(@InjectPinoLogger(AppService.name) logger: PinoLogger) {
    super(logger);
  }
}
