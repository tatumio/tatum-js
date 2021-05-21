import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator';
import { DeployMultiToken } from './DeployMultiToken'
import { Fee } from './Fee'

export class EthDeployMultiToken extends DeployMultiToken {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;
}
