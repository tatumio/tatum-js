import { TransferMultiToken, Currency } from '@tatumio/tatum-core';
import {IsIn, IsNotEmpty,} from 'class-validator'

export class CeloTransferMultiToken extends TransferMultiToken {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
