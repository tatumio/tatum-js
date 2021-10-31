import { BaseBurnErc721, Currency } from '@tatumio/tatum-core'
import { IsIn, IsNotEmpty } from 'class-validator'

export class CeloBurnErc721 extends BaseBurnErc721 {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency
}
