import { Type } from 'class-transformer'
import {
  IsOptional,
  ValidateNested,
} from 'class-validator'
import { BurnErc721 } from './BurnErc721';
import { Fee } from './Fee';

export class EthBurnErc721 extends BurnErc721 {
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}
