import { DeployErc721 } from '@tatumio/tatum-core'
import { IsOptional, Min } from 'class-validator'

export class OneDeploy721 extends DeployErc721 {
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @IsOptional()
  @Min(0)
  public toShardID?: number
}

export type ChainOneDeploy721 = Omit<OneDeploy721, 'chain'>
