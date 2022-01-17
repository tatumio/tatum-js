import { IsIn, IsNotEmpty, IsOptional, Min } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class BaseDeployMultiToken extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  public uri: string

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC, Currency.KCS, Currency.GLMR])
  public chain: Currency

  @Min(0)
  @IsOptional()
  public nonce?: number
}
