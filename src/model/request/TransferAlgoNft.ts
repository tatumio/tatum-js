import { IsIn, IsNotEmpty, Length, ValidateIf } from 'class-validator';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'
import { Currency } from './Currency'

export class TransferAlgoNft extends PrivateKeyOrSignatureId {

  @IsNotEmpty()
  @Length(1, 30)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.ALGO])
  public chain: Currency

  @IsNotEmpty()
  @Length(58, 58)
  public to: string;

  @ValidateIf(o => o.signatureId)
  @IsNotEmpty()
  @Length(58, 58)
  public from: string;
}
