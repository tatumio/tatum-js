import {IsOptional, Min} from 'class-validator';
import {TransferErc20} from './TransferErc20';

export class OneTransfer20 extends TransferErc20 {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
