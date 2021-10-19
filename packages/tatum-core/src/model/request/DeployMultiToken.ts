import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { BaseDeployMultiToken } from './BaseDeployMultiToken'
import { Fee } from './Fee';

export class DeployMultiToken extends BaseDeployMultiToken {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;
}
