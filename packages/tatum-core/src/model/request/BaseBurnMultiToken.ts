import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, MaxLength, Min, ValidateIf } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class BaseBurnMultiToken extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(42, 58)
  public account: string

  @IsNotEmpty()
  @MaxLength(256)
  public tokenId: string

  @IsNotEmpty()
  public amount: string

  @IsNotEmpty()
  @Length(1, 43)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC, Currency.ALGO, Currency.KCS, Currency.GLMR])
  public chain: Currency

  @Min(0)
  @IsInt()
  @IsOptional()
  public nonce?: number

  @ValidateIf((o) => o.chain === Currency.ALGO && o.signatureId)
  @IsNotEmpty()
  @Length(42, 58)
  public from?: string
}
