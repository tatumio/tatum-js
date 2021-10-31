import { IsInt, IsNotEmpty, IsOptional, IsUUID, Length, Max, MaxLength, Min, ValidateIf } from 'class-validator'
import { BaseTransferErc20Offchain } from './BaseTransferErc20Offchain'

export class TransferOffchain extends BaseTransferErc20Offchain {
  @Length(1, 500)
  @ValidateIf((o) => (o.mnemonic && o.index >= 0 && o.privateKey) || (o.index >= 0 && o.privateKey))
  @IsNotEmpty()
  public mnemonic?: string

  @ValidateIf((o) => (o.mnemonic && o.index >= 0 && o.privateKey) || o.mnemonic)
  @Min(0)
  @IsNotEmpty()
  @IsInt()
  @Max(2147483647)
  public index?: number

  @ValidateIf((o) => (o.mnemonic && o.index >= 0 && o.privateKey) || (!o.mnemonic && !o.signatureId && !o.index))
  @Length(66, 66)
  @IsNotEmpty()
  public privateKey?: string

  @ValidateIf((o) => !o.mnemonic && !o.privateKey)
  @Length(36, 36)
  @IsUUID('4')
  @IsNotEmpty()
  public signatureId?: string

  @MaxLength(50000)
  @IsOptional()
  public data?: string
}
