import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { Fee } from './Fee'
import { BaseTransferErc721 } from './BaseTransferErc721'

export class TransferErc721 extends BaseTransferErc721 {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
