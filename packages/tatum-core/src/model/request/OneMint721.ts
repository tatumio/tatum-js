import { MintErc721 } from './'
import { IsOptional, Min } from 'class-validator'

export class OneMint721 extends MintErc721 {
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @IsOptional()
  @Min(0)
  public toShardID?: number
}

export type ChainOneMint721 = Omit<OneMint721, 'chain'>
