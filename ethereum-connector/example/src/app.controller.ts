import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EthereumController } from '../../module';

@Controller()
export class AppController extends EthereumController {
  constructor(private readonly ethereumService: AppService) {
    super(ethereumService);
  }
}
