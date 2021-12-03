import { BurnMultiTokenBatch } from '@tatumio/tatum-core'
import { IsOptional, Min } from 'class-validator'

export class OneBurnMultiTokenBatch extends BurnMultiTokenBatch {
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @IsOptional()
  @Min(0)
  public toShardID?: number
}

export type ChainOneBurnMultiTokenBatch = Omit<OneBurnMultiTokenBatch, 'chain'>
