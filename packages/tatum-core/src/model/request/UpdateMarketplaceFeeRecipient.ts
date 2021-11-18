import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator'
import { Currency } from './Currency'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class UpdateMarketplaceFeeRecipient extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(34, 43)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.ETH, Currency.MATIC, Currency.BSC, Currency.ONE, Currency.CELO, Currency.TRON, Currency.KCS])
  public chain: Currency

  @IsNotEmpty()
  @Length(34, 43)
  public feeRecipient: string

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
