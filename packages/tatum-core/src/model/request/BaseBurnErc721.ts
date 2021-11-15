import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, MaxLength, Min } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class BaseBurnErc721 extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @MaxLength(256)
  public tokenId: string

  @IsNotEmpty()
  @Length(1, 43)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.TRON, Currency.ONE, Currency.MATIC, Currency.ALGO, Currency.KCS])
  public chain: Currency

  @Min(0)
  @IsInt()
  @IsOptional()
  public nonce?: number
}
