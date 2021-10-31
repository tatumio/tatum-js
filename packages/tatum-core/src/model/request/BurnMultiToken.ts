import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { BaseBurnMultiToken } from './BaseBurnMultiToken'
import { Fee } from './Fee'

export class BurnMultiToken extends BaseBurnMultiToken {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
