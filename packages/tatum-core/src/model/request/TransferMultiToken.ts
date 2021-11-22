import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsOptional, Length, MaxLength, Min, ValidateNested, ValidateIf } from 'class-validator'
import { Currency } from './Currency'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class TransferMultiToken extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(42, 58)
  public to: string

  @IsNotEmpty()
  @MaxLength(256)
  public tokenId: string

  @IsNotEmpty()
  @Length(1, 43)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC, Currency.ALGO, Currency.KCS])
  public chain: Currency

  @IsNotEmpty()
  public amount: string

  @IsOptional()
  public data: string

  @Min(0)
  @IsOptional()
  public nonce?: number

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee

  @ValidateIf((o) => o.chain === Currency.ALGO && o.signatureId)
  @IsNotEmpty()
  @Length(42, 58)
  public from?: string
}
