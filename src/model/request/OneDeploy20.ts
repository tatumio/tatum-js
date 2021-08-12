import {IsOptional, Min,} from 'class-validator'
import {DeployErc20} from './DeployErc20'

export class OneDeploy20 extends DeployErc20 {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
