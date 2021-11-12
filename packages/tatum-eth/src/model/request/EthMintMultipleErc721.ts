import { Fee, MintMultipleErc721 } from '@tatumio/tatum-core'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

export class EthMintMultipleErc721 extends MintMultipleErc721 {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
