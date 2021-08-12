import {IsOptional, Min} from 'class-validator'
import {TransferMultiToken} from './TransferMultiToken'

export class OneTransferMultiToken extends TransferMultiToken {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
