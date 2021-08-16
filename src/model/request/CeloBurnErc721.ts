import {IsIn, IsNotEmpty,} from 'class-validator'
import {BurnErc721} from './BurnErc721'
import {Currency} from './Currency'

export class CeloBurnErc721 extends BurnErc721 {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
