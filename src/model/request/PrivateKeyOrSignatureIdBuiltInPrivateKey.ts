import { IsNotEmpty, IsOptional, IsUUID, Length, Min, Validate, ValidateIf } from 'class-validator'
import { Mint721BuiltInPrivateKeyValidator } from '../validation/Mint721BuiltInPrivateKeyValidator'

export class PrivateKeyOrSignatureIdBuiltInPrivateKey {
  @Validate(Mint721BuiltInPrivateKeyValidator)
  public fromPrivateKey?: string;

  @Validate(Mint721BuiltInPrivateKeyValidator)
  public signatureId?: string;

  @ValidateIf(o => o.signatureId)
  @IsOptional()
  @Min(0)
  public index?: number;
}
