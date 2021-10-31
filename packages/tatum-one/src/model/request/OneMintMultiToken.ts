import { MintMultiToken } from '@tatumio/tatum-core'
import { IsOptional, Min } from 'class-validator'

export class OneMintMultiToken extends MintMultiToken {
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @IsOptional()
  @Min(0)
  public toShardID?: number
}
