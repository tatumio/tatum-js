import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, Min } from 'class-validator'
import { Currency } from './Currency'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class InvokeMarketplaceListingOperation extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(34, 43)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.ETH, Currency.MATIC, Currency.BSC, Currency.ONE, Currency.CELO, Currency.TRON, Currency.KCS])
  public chain: Currency

  @IsNotEmpty()
  public listingId: string

  @IsOptional()
  @Length(34, 43)
  public erc20Address?: string

  @IsOptional()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public amount?: string

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
