import {IsNotEmpty, Length, Min, ValidateIf,} from 'class-validator'
import {TransferErc721} from './TransferErc721'

export class TronTransferTrc721 extends TransferErc721 {

  @ValidateIf(o => o.signatureId)
  @IsNotEmpty()
  @Length(34, 34)
  public from?: string;

  @IsNotEmpty()
  @Length(34, 34)
  public to: string;

  @IsNotEmpty()
  @Length(34, 34)
  public contractAddress: string;

  @IsNotEmpty()
  @Min(0)
  public feeLimit: number;
}
