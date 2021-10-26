import { TransferErc721 } from '@tatumio/tatum-core';
import {IsOptional, Min,} from 'class-validator'

export class OneTransfer721 extends TransferErc721 {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
