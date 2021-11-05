import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsOptional, Length, MaxLength, Min, ValidateNested, ValidateIf } from 'class-validator'
import { Currency } from './Currency'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class MintMultiToken extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(42, 58)
  public to: string

  @IsNotEmpty()
  @MaxLength(256)
  public tokenId: string

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC, Currency.ALGO])
  public chain: Currency

  @IsNotEmpty()
  @Length(1, 43)
  public contractAddress: string

  @Min(0)
  @IsOptional()
  public nonce?: number

  @IsOptional()
  public data: string

  @IsNotEmpty()
  public amount: string

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee

  @ValidateIf(o => o.chain === Currency.ALGO)
  @IsNotEmpty()
  public url?: string;
}
