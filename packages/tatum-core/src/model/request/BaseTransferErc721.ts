import { IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, Min } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class BaseTransferErc721 extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(42, 43)
  public to: string

  @IsNotEmpty()
  @MaxLength(256)
  public tokenId: string

  @IsNotEmpty()
  @Length(42, 43)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.TRON, Currency.ONE, Currency.MATIC])
  public chain: Currency

  @Min(0)
  @IsOptional()
  public nonce?: number

  @IsOptional()
  @IsNumberString()
  public value?: string
}
