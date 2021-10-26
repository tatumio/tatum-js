import { MintMultiTokenBatch } from '@tatumio/tatum-core';
import {IsOptional, Min} from 'class-validator'

export class OneMintMultiTokenBatch extends MintMultiTokenBatch {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
