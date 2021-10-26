import { MintMultipleErc721 } from '@tatumio/tatum-core';
import {IsOptional, Min} from 'class-validator'

export class OneMintMultiple721 extends MintMultipleErc721 {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
