import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { TronController } from '../../module/npm';

@Controller()
export class AppController extends TronController {
  constructor(private readonly tronService: AppService) {
    super(tronService);
  }
}
