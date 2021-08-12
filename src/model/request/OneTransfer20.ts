import {IsOptional, Min} from 'class-validator'
import {TransferCustomErc20} from './TransferCustomErc20'

export class OneTransfer20 extends TransferCustomErc20 {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
