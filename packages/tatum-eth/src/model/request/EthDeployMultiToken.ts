import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import {Fee, DeployMultiToken } from '@tatumio/tatum-core'

export class EthDeployMultiToken extends DeployMultiToken {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;
}
