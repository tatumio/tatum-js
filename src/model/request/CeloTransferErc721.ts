import {
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { Currency } from './Currency';
import { TransferErc721 } from './TransferErc721'

export class CeloTransferErc721 extends TransferErc721 {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD])
  public feeCurrency: Currency;
}
