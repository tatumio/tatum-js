import {Type} from 'class-transformer'
import {IsOptional, ValidateNested} from 'class-validator'
import { Fee } from './Fee';
import { BaseMintErc721 } from './BaseMintErc721';

export class MintErc721 extends BaseMintErc721 {

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;

}
