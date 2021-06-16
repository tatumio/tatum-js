import {IsOptional, Min} from 'class-validator';
import {EthDeployMultiToken} from './EthDeployMultiToken';

export class OneDeployMultiToken extends EthDeployMultiToken {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
