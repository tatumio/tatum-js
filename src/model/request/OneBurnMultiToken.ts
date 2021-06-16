import {IsOptional, Min,} from 'class-validator';
import {EthBurnMultiToken} from './EthBurnMultiToken';

export class OneBurnMultiToken extends EthBurnMultiToken {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
