import {Type} from 'class-transformer'
import {IsOptional, ValidateNested} from 'class-validator'
import {Fee, MintErc721 } from '@tatumio/tatum-core'

export class EthMintErc721 extends MintErc721 {

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;

}
