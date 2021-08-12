import {IsOptional, Min,} from 'class-validator'
import {EthTransferErc721} from './EthTransferErc721'

export class OneTransfer721 extends EthTransferErc721 {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
