import { BaseBurnMultiTokenBatch, Currency } from '@tatumio/tatum-core'
import { IsIn, IsNotEmpty } from 'class-validator'

export class CeloBurnMultiTokenBatch extends BaseBurnMultiTokenBatch {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency
}
