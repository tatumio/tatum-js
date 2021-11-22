import { Fee } from './Fee'
import { TransferErc721 } from './TransferErc721'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

export class EthTransferErc721 extends TransferErc721 {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
