import { Currency } from './Currency'
import { SmartContractMethodInvocation } from './SmartContractMethodInvocation'
import { IsIn, IsNotEmpty } from 'class-validator'

export class CeloSmartContractMethodInvocation extends SmartContractMethodInvocation {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency
}
