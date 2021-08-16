import {IsIn, IsNotEmpty} from 'class-validator'
import {Currency} from './Currency'
import {UpdateCashbackErc721} from './UpdateCashbackErc721'

export class CeloUpdateCashbackMultiToken extends UpdateCashbackErc721 {

  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
