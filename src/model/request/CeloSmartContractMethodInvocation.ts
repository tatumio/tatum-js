import {IsIn, IsNotEmpty,} from 'class-validator';
import {Currency} from './Currency';
import {SmartContractMethodInvocation} from './SmartContractMethodInvocation';

export class CeloSmartContractMethodInvocation extends SmartContractMethodInvocation {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
