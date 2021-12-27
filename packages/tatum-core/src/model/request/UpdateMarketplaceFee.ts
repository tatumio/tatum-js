import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, Length, Max, Min } from 'class-validator'
import { Currency } from './Currency'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class UpdateMarketplaceFee extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(34, 43)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.ETH, Currency.MATIC, Currency.BSC, Currency.ONE, Currency.CELO, Currency.TRON, Currency.KCS, Currency.GLMR])
  public chain: Currency

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(10000)
  public marketplaceFee: number

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
