import {IsInt, IsNotEmpty, IsOptional, IsUUID, Length, Max, Min, ValidateIf} from 'class-validator'
import {EgldSendTransaction} from './EgldSendTransaction'

export class EgldTransferOffchain extends EgldSendTransaction {
  @Length(1, 500)
  @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.fromPrivateKey) || (o.index >= 0 && o.fromPrivateKey))
  @IsNotEmpty()
  public mnemonic?: string;

  @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.fromPrivateKey) || o.mnemonic)
  @Min(0)
  @IsOptional()
  @IsInt()
  @Max(2147483647)
  public index?: number;

  @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.fromPrivateKey) || (!o.mnemonic && !o.index))
  @Length(66, 66)
  @IsNotEmpty()
  public fromPrivateKey?: string;

  @ValidateIf(o => o.signatureId)
  @Length(34, 34)
  @IsNotEmpty()
  public from?: string;

  @ValidateIf(o => !o.mnemonic && !o.fromPrivateKey)
  @Length(36, 36)
  @IsUUID('4')
  @IsNotEmpty()
  public signatureId?: string;
}
