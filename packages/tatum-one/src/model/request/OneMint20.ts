import { MintErc20 } from '@tatumio/tatum-core'
import { IsOptional, Min } from 'class-validator'

export class OneMint20 extends MintErc20 {
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @IsOptional()
  @Min(0)
  public toShardID?: number
}
