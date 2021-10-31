import { Currency, UpdateCashbackErc721 } from '@tatumio/tatum-core'
import { IsIn, IsNotEmpty } from 'class-validator'

export class CeloUpdateCashbackMultiToken extends UpdateCashbackErc721 {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency
}
