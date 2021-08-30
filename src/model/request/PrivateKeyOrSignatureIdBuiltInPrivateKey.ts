import {IsNotEmpty, IsOptional, IsUUID, Length, Min, ValidateIf} from 'class-validator'

export class PrivateKeyOrSignatureIdBuiltInPrivateKey {
  @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.signatureId)
  @IsNotEmpty()
  @Length(64, 66)
  public fromPrivateKey?: string;

  @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.fromPrivateKey)
  @Length(36, 36)
  @IsUUID('4')
  @IsNotEmpty()
  public signatureId?: string;

  @ValidateIf(o => o.signatureId)
  @IsOptional()
  @Min(0)
  public index?: number;
}
