import { IsNotEmpty, IsUUID, Length, Validate, ValidateIf } from 'class-validator'
import { SignatureIdValidator } from '../validation/SignatureIdValidator'

export class PrivateKeyOrSignatureId {
  @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.signatureId)
  @Validate(SignatureIdValidator)
  @IsNotEmpty()
  @Length(66, 66)
  public fromPrivateKey: string;

  @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.fromPrivateKey)
  @Validate(SignatureIdValidator)
  @Length(36, 36)
  @IsUUID('4')
  @IsNotEmpty()
  public signatureId?: string;
}