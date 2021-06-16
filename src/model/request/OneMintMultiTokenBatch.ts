import {IsOptional, Min} from 'class-validator';
import {MintMultiTokenBatch} from './MintMultiTokenBatch';

export class OneMintMultiTokenBatch extends MintMultiTokenBatch {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
