import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { QuorumController } from '../../module/npm';

@Controller()
export class AppController extends QuorumController {
  constructor(private readonly quorumService: AppService) {
    super(quorumService);
  }
}
