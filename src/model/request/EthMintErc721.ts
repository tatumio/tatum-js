import {Type} from 'class-transformer'
import {IsOptional, ValidateNested} from 'class-validator'
import {Fee} from './Fee'
import {MintErc721} from './MintErc721'

export class EthMintErc721 extends MintErc721 {

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;

}
