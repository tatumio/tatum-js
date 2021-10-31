import { Currency, TransferOffchain } from '@tatumio/tatum-core'
import { IsIn, IsNotEmpty } from 'class-validator'

export class TransferCeloOffchain extends TransferOffchain {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency
}
