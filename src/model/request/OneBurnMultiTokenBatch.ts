import {IsOptional, Min,} from 'class-validator'
import {EthBurnMultiTokenBatch} from './EthBurnMultiTokenBatch'

export class OneBurnMultiTokenBatch extends EthBurnMultiTokenBatch {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
