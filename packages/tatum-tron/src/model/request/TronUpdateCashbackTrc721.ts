import {IsNotEmpty, Length, Min, ValidateIf} from 'class-validator'
import {UpdateCashbackErc721} from './UpdateCashbackErc721'

export class TronUpdateCashbackTrc721 extends UpdateCashbackErc721 {

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
