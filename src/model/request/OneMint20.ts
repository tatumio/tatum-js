import {IsOptional, Min,} from 'class-validator';
import {MintErc20} from './MintErc20';

export class OneMint20 extends MintErc20 {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
