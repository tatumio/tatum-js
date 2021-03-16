import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { NftController } from '../../module';

@Controller()
export class AppController extends NftController {
  constructor(private readonly myService: AppService) {
    super(myService);
  }
}
