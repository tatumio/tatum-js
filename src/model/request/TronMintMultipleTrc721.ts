import {IsNotEmpty, Length, Min, ValidateIf} from 'class-validator';
import {MintMultipleErc721} from './MintMultipleErc721';

export class TronMintMultipleTrc721 extends MintMultipleErc721 {

  @ValidateIf(o => o.signatureId)
  @IsNotEmpty()
  @Length(34, 34)
  public from?: string;

  @IsNotEmpty()
  @Length(34, 34)
  public contractAddress: string;

  @IsNotEmpty()
  @Min(0)
  public feeLimit: number;
}
