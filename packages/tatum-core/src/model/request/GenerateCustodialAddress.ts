import { Type } from 'class-transformer'
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, Min } from 'class-validator'
import { Currency } from './Currency'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class GenerateCustodialAddress extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @IsIn([Currency.ETH, Currency.MATIC, Currency.BSC, Currency.ONE, Currency.CELO, Currency.TRON])
  public chain: Currency

  @IsBoolean()
  @IsNotEmpty()
  public enableFungibleTokens: boolean

  @IsBoolean()
  @IsNotEmpty()
  public enableNonFungibleTokens: boolean

  @IsBoolean()
  @IsNotEmpty()
  public enableSemiFungibleTokens: boolean

  @IsBoolean()
  @IsNotEmpty()
  public enableBatchTransactions: boolean

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
