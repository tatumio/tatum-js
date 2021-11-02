import { IsNotEmpty, IsUUID, Length, Validate, ValidateIf } from 'class-validator'
import { SignatureIdValidator } from '@tatumio/tatum-core'

export class PrivateKeyOrSignatureIdBtcBased {
  @ValidateIf((o) => o.privateKey || !o.signatureId)
  @IsNotEmpty()
  @Length(52, 256)
  public privateKey?: string

  @ValidateIf((o) => o.signatureId || !o.privateKey)
  @Validate(SignatureIdValidator)
  @IsNotEmpty()
  @Length(36, 36)
  @IsUUID('4')
  public signatureId?: string
}
