import {Type} from 'class-transformer'
import {IsOptional, ValidateNested,} from 'class-validator'
import {BurnMultiToken} from './BurnMultiToken'
import {Fee} from './Fee'

export class EthBurnMultiToken extends BurnMultiToken {
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}
