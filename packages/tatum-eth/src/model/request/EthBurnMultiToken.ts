import {Type} from 'class-transformer'
import {IsOptional, ValidateNested,} from 'class-validator'
import {Fee, BurnMultiToken } from '@tatumio/tatum-core'

export class EthBurnMultiToken extends BurnMultiToken {
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}
