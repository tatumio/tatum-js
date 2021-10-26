import { DeployMultiToken } from '@tatumio/tatum-core';
import {IsOptional, Min} from 'class-validator'

export class OneDeployMultiToken extends DeployMultiToken {

    @IsOptional()
    @Min(0)
    public fromShardID?: number;

    @IsOptional()
    @Min(0)
    public toShardID?: number;
}
