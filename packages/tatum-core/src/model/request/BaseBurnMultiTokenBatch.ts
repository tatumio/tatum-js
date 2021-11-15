import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class BaseBurnMultiTokenBatch extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(42, 43)
  public account: string

  @IsNotEmpty()
  public tokenId: string[]

  @IsNotEmpty()
  public amounts: string[]

  @IsNotEmpty()
  @Length(42, 43)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC, Currency.KCS])
  public chain: Currency

  @Min(0)
  @IsInt()
  @IsOptional()
  public nonce?: number
}
