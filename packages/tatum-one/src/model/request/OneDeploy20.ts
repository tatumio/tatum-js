import { DeployErc20 } from '@tatumio/tatum-core';
import {IsOptional, Min,} from 'class-validator'

export class OneDeploy20 extends DeployErc20 {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
