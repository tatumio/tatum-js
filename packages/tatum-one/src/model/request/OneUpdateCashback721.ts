import { UpdateCashbackErc721 } from '@tatumio/tatum-core';
import {IsOptional, Min} from 'class-validator'

export class OneUpdateCashback721 extends UpdateCashbackErc721 {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
