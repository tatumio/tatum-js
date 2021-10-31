import { MintMultiToken, Currency } from '@tatumio/tatum-core'
import { IsIn, IsNotEmpty } from 'class-validator'

export class CeloMintMultiToken extends MintMultiToken {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency
}
