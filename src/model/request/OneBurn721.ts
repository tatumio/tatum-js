import {IsOptional, Min,} from 'class-validator'
import {EthBurnErc721} from './EthBurnErc721'

export class OneBurn721 extends EthBurnErc721 {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
