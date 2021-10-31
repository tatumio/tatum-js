import { BaseDeployErc721, Currency } from '@tatumio/tatum-core'
import { IsIn, IsNotEmpty } from 'class-validator'

export class CeloDeployErc721 extends BaseDeployErc721 {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency
}
