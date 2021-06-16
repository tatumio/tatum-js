import {IsOptional, Min} from 'class-validator';
import {TransferMultiTokenBatch} from './TransferMultiTokenBatch';

export class OneTransferMultiTokenBatch extends TransferMultiTokenBatch {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
