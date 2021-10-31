import { IsNotEmpty, IsOptional, IsUUID, Length, Min, Validate, ValidateIf } from 'class-validator'
import { SignatureIdValidator } from '../validation/SignatureIdValidator'

export class PrivateKeyOrSignatureId {
  @ValidateIf((o) => (o.fromPrivateKey && o.signatureId) || !o.signatureId)
  @Validate(SignatureIdValidator)
  @IsNotEmpty()
  @Length(64, 66)
  public fromPrivateKey?: string

  @ValidateIf((o) => (o.fromPrivateKey && o.signatureId) || !o.fromPrivateKey)
  @Validate(SignatureIdValidator)
  @Length(36, 36)
  @IsUUID('4')
  @IsNotEmpty()
  public signatureId?: string

  @ValidateIf((o) => o.signatureId)
  @IsOptional()
  @Min(0)
  public index?: number
}
