import { BurnErc20 } from '@tatumio/tatum-core'
import { IsOptional, Min } from 'class-validator'

export class OneBurn20 extends BurnErc20 {
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @IsOptional()
  @Min(0)
  public toShardID?: number
}
