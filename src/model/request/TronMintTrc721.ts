import {IsNotEmpty, Length, Min, ValidateIf,} from 'class-validator'
import {MintErc721} from './MintErc721'

export class TronMintTrc721 extends MintErc721 {

  @IsNotEmpty()
  @Length(34, 34)
  public to: string;

  @IsNotEmpty()
  @Length(34, 34)
  public contractAddress: string;

  @ValidateIf(o => o.signatureId)
  @IsNotEmpty()
  @Length(34, 34)
  public from?: string;

  @IsNotEmpty()
  @Min(0)
  public feeLimit: number;

}
