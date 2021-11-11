import { Fee, TransferErc721 } from '@tatumio/tatum-core'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

export class EthTransferErc721 extends TransferErc721 {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
