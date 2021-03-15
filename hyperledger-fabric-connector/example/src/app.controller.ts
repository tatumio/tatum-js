import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { FabricController } from '../../module';

@Controller()
export class AppController extends FabricController {
  constructor(private readonly quorumService: AppService) {
    super(quorumService);
  }
}
