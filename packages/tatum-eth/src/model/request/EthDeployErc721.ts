import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import {Fee, DeployErc721 } from '@tatumio/tatum-core'

export class EthDeployErc721 extends DeployErc721 {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;
}
