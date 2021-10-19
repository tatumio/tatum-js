import { UpdateCashbackErc721, Currency } from '@tatumio/tatum-core';
import {IsIn, IsNotEmpty} from 'class-validator'

export class CeloUpdateCashbackErc721 extends UpdateCashbackErc721 {

  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
