import { BurnMultiToken, Fee } from '@tatumio/tatum-core'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

export class EthBurnMultiToken extends BurnMultiToken {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
