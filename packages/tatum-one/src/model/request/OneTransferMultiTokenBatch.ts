import { TransferMultiTokenBatch } from '@tatumio/tatum-core'
import { IsOptional, Min } from 'class-validator'

export class OneTransferMultiTokenBatch extends TransferMultiTokenBatch {
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @IsOptional()
  @Min(0)
  public toShardID?: number
}
