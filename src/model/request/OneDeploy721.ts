import {IsOptional, Min} from 'class-validator';
import {EthDeployErc721} from './EthDeployErc721';

export class OneDeploy721 extends EthDeployErc721 {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
