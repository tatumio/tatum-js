import {IsOptional, Min,} from 'class-validator'
import {BurnErc20} from './BurnErc20'

export class OneBurn20 extends BurnErc20 {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
