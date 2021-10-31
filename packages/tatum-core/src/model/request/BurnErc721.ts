import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { BaseBurnErc721 } from './BaseBurnErc721'
import { Fee } from './Fee'

export class BurnErc721 extends BaseBurnErc721 {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
