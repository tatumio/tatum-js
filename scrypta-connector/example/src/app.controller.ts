import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ScryptaController } from '../../module/npm';

@Controller()
export class AppController extends ScryptaController {
  constructor(private readonly scryptaService: AppService) {
    super(scryptaService);
  }
}
