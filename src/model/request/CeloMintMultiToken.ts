import {
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { Currency } from './Currency';
import { MintMultiToken } from './MintMultiToken';

export class CeloMintMultiToken extends MintMultiToken {

  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}