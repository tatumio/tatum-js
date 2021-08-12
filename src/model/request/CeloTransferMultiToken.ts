import {IsIn, IsNotEmpty,} from 'class-validator'
import {Currency} from './Currency'
import { TransferMultiToken } from './TransferMultiToken'

export class CeloTransferMultiToken extends TransferMultiToken {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
