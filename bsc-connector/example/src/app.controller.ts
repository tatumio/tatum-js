import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { BscController } from '../../module';

@Controller()
export class AppController extends BscController {
  constructor(private readonly bscService: AppService) {
    super(bscService);
  }
}
