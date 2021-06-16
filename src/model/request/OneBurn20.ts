import {Type} from 'class-transformer';
import {IsOptional, Min, ValidateNested,} from 'class-validator';
import {BurnErc20} from './BurnErc20';
import {Fee} from './Fee';

export class OneBurn20 extends BurnErc20 {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}
