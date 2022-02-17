import { IsOptional, IsUUID, Length, Min, Validate, ValidateIf } from 'class-validator'
import { SignatureIdValidator } from '../validation/SignatureIdValidator'

export class PrivateKeyOrSignatureId {
  @Validate(SignatureIdValidator)
  @IsOptional()
  @Length(64, 103)
  public fromPrivateKey?: string;

  @Validate(SignatureIdValidator)
  @Length(36, 36)
  @IsUUID('4')
  @IsOptional()
  public signatureId?: string;

  @ValidateIf(o => o.signatureId)
  @IsOptional()
  @Min(0)
  public index?: number;
}
