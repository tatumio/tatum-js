import { TransferMultiToken } from '@tatumio/tatum-core'
import { IsOptional, Min } from 'class-validator'

export class OneTransferMultiToken extends TransferMultiToken {
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @IsOptional()
  @Min(0)
  public toShardID?: number
}

export type ChainOneTransferMultiToken = Omit<OneTransferMultiToken, 'chain'>
