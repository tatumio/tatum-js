import { Type } from 'class-transformer'
import {
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Fee } from './Fee'
import { BurnMultiToken } from './BurnMultiToken';

export class EthBurnMultiToken extends BurnMultiToken {
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}
