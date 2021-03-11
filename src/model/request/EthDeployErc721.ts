import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator';
import { DeployErc721 } from './DeployErc721'
import { Fee } from './Fee'

export class EthDeployErc721 extends DeployErc721 {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;
}
