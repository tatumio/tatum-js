import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { CeloController } from '../../module';

@Controller()
export class AppController extends CeloController {
  constructor(private readonly celoService: AppService) {
    super(celoService);
  }
}
