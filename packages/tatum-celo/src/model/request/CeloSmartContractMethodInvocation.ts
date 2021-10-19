import { Currency, SmartContractMethodInvocation } from '@tatumio/tatum-core';
import {IsIn, IsNotEmpty,} from 'class-validator'

export class CeloSmartContractMethodInvocation extends SmartContractMethodInvocation {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
