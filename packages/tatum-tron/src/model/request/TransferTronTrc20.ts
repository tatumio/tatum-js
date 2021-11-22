import { IsNotEmpty, IsNumberString, IsOptional, IsUUID, Length, Matches, Min, ValidateIf } from 'class-validator'

export class TransferTronTrc20 {
  @ValidateIf((o) => !(o.from || o.signatureId))
  @IsNotEmpty()
  @Length(64, 64)
  public fromPrivateKey?: string

  @ValidateIf((o) => !o.fromPrivateKey)
  @IsNotEmpty()
  @Length(34, 34)
  public from?: string

  @ValidateIf((o) => !o.fromPrivateKey)
  @Length(36, 36)
  @IsUUID('4')
  @IsNotEmpty()
  public signatureId?: string

  @ValidateIf((o) => o.signatureId)
  @IsOptional()
  @Min(0)
  public index?: number

  @IsNotEmpty()
  @Length(34, 34)
  public to: string

  @IsNotEmpty()
  @Length(34, 34)
  public tokenAddress: string

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public amount: string

  @IsNotEmpty()
  @Min(0)
  public feeLimit: number
}
