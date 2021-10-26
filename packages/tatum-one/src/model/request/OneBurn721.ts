import { BurnErc721 } from '@tatumio/tatum-core';
import {IsOptional, Min,} from 'class-validator'

export class OneBurn721 extends BurnErc721 {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
