import { Type } from 'class-transformer'
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, Length, Min, Validate } from 'class-validator'
import { AmountDecimalValidator } from '../validation/AmountDecimalValidator'
import { Currency } from './Currency'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class CreateAuction extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(34, 43)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.ETH, Currency.MATIC, Currency.BSC, Currency.ONE, Currency.CELO, Currency.TRON])
  public chain: Currency

  @IsNotEmpty()
  @Length(1, 200)
  public id: string

  @IsNotEmpty()
  @Length(34, 43)
  public nftAddress: string

  @IsNotEmpty()
  @Length(34, 43)
  public seller: string

  @IsOptional()
  @Length(34, 43)
  public erc20Address?: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public endedAt: number

  @IsNotEmpty()
  @IsNumberString()
  public tokenId: string

  @Validate(AmountDecimalValidator)
  @IsOptional()
  @IsNumberString()
  public amount?: string

  @IsNotEmpty()
  @IsBoolean()
  public isErc721: boolean

  @IsOptional()
  @Min(0)
  public nonce?: number

  @IsOptional()
  @Type(() => Fee)
  public fee?: Fee

  @IsOptional()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency?: Currency
}
