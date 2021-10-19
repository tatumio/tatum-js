import { BaseTransferErc721, Currency } from '@tatumio/tatum-core';
import {IsIn, IsNotEmpty,} from 'class-validator'

export class CeloTransferErc721 extends BaseTransferErc721 {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
