import { TransferErc20 } from '@tatumio/tatum-core'
import { IsOptional, Min } from 'class-validator'

export class OneTransfer20 extends TransferErc20 {
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @IsOptional()
  @Min(0)
  public toShardID?: number
}

export type ChainOneTransfer20 = Omit<OneTransfer20, 'chain'>
