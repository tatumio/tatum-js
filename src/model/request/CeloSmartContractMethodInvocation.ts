import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsIn,
} from 'class-validator';
import { SmartContractMethodInvocation } from './SmartContractMethodInvocation'
import {Currency} from './Currency';

export class CeloSmartContractMethodInvocation extends SmartContractMethodInvocation {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
