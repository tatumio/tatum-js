import { IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateIf  } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class BaseDeployErc721 extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(1, 100)
  public name: string

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.TRON, Currency.ONE, Currency.MATIC, Currency.ALGO, Currency.KCS])
  public chain: Currency

  @IsNotEmpty()
  @Length(1, 30)
  public symbol: string

  @Min(0)
  @IsOptional()
  public nonce?: number
  
  @ValidateIf(o => o.chain === Currency.ALGO)
  @IsNotEmpty()
  public url?: string;
}
