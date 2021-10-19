import { BaseBurnMultiToken, Currency } from '@tatumio/tatum-core';
import {IsIn, IsNotEmpty,} from 'class-validator'

export class CeloBurnMultiToken extends BaseBurnMultiToken {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
