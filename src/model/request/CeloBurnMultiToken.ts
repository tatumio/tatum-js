import {IsIn, IsNotEmpty,} from 'class-validator';
import {Currency} from './Currency';
import { BurnMultiToken } from './BurnMultiToken';

export class CeloBurnMultiToken extends BurnMultiToken {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
