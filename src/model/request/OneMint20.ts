import {Type} from 'class-transformer';
import {IsOptional, Min, ValidateNested,} from 'class-validator';
import {Fee} from './Fee';
import {MintErc20} from './MintErc20';

export class OneMint20 extends MintErc20 {
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
