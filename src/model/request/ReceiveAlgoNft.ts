import { IsNotEmpty, Length, Min, ValidateIf } from 'class-validator';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class ReceiveAlgoNft extends PrivateKeyOrSignatureId {

  @IsNotEmpty()
  @Min(1)
  public assetId: number

  @ValidateIf(o => o.signatureId)
  @IsNotEmpty()
  @Length(58, 58)
  public from: string;
}
