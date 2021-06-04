import {IsIn, IsNotEmpty,} from 'class-validator';
import {BurnMultiToken} from './BurnMultiToken';
import {Currency} from './Currency';

export class CeloBurnMultiToken extends BurnMultiToken {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
