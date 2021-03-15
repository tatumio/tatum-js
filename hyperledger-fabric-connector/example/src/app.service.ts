import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'pino-logger';
import { InjectPinoLogger } from 'nestjs-pino';
import { FabricService } from '../../module';

@Injectable()
export class AppService extends FabricService {
  constructor(@InjectPinoLogger(AppService.name) logger: PinoLogger) {
    super(logger);
  }
}
