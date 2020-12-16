import {Get} from '@nestjs/common';
import {BlueprintBlockchainService} from './BlueprintBlockchainService';

export abstract class BlueprintController {
  protected constructor(protected readonly service: BlueprintBlockchainService) {}

  @Get('/v3/blueprint/info')
  async getInfo() {
    return await this.service.getBlockChainInfo();
  }

  // Integrate more methods like generate address, get block, etc. here

}
