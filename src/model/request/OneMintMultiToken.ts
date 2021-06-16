import {IsOptional, Min} from 'class-validator';
import {MintMultiToken} from './MintMultiToken';

export class OneMintMultiToken extends MintMultiToken {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;

}
