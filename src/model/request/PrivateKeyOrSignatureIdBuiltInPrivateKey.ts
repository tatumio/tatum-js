import { IsOptional, IsUUID, Length, Min, Validate, ValidateIf } from 'class-validator'
import { Mint721BuiltInPrivateKeyValidator } from '../validation/Mint721BuiltInPrivateKeyValidator'

export class PrivateKeyOrSignatureIdBuiltInPrivateKey {
  @Validate(Mint721BuiltInPrivateKeyValidator)
  @IsOptional()
  @Length(64, 66)
  public fromPrivateKey?: string;

  @Validate(Mint721BuiltInPrivateKeyValidator)
  @IsOptional()
  @IsUUID('4')
  public signatureId?: string;

  @ValidateIf(o => o.signatureId)
  @IsOptional()
  @Min(0)
  public index?: number;
}
