import { IsNotEmpty, Length, Min, ValidateIf } from 'class-validator';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class ReceiveAlgoNft extends PrivateKeyOrSignatureId {

  @IsNotEmpty()
  @Min(1)
  public assetId: number

  @IsNotEmpty()
  @Length(58, 58)
  public recipient: string;

  @ValidateIf(o => o.signatureId)
  @IsNotEmpty()
  @Length(58, 58)
  public from: string;
}
