import {Type} from 'class-transformer'
import {IsOptional, ValidateNested,} from 'class-validator'
import {Fee, BurnMultiTokenBatch } from '@tatumio/tatum-core'

export class EthBurnMultiTokenBatch extends BurnMultiTokenBatch {
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}
