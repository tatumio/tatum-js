import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { BaseBurnMultiTokenBatch } from './BaseBurnMultiTokenBatch'
import { Fee } from './Fee'

export class BurnMultiTokenBatch extends BaseBurnMultiTokenBatch {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
