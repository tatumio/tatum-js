import { BurnMultiTokenBatch, Fee } from '@tatumio/tatum-core'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

export class EthBurnMultiTokenBatch extends BurnMultiTokenBatch {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
