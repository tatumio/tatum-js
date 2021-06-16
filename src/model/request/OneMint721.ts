import {IsOptional, Min} from 'class-validator';
import {EthMintErc721} from './EthMintErc721';

export class OneMint721 extends EthMintErc721 {

  @IsOptional()
  @Min(0)
  public fromShardID?: number;

  @IsOptional()
  @Min(0)
  public toShardID?: number;

}
