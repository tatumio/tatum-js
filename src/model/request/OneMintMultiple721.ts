import {IsOptional, Min} from 'class-validator';
import {EthMintMultipleErc721} from './EthMintMultipleErc721';

export class OneMintMultiple721 extends EthMintMultipleErc721 {
    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
