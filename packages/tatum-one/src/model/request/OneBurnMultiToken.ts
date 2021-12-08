import { BurnMultiToken } from '@tatumio/tatum-core'
import { IsOptional, Min } from 'class-validator'

export class OneBurnMultiToken extends BurnMultiToken {
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @IsOptional()
  @Min(0)
  public toShardID?: number
}

export type ChainOneBurnMultiToken = Omit<OneBurnMultiToken, 'chain'>
