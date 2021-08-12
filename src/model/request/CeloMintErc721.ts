import {
  IsIn,
  IsNotEmpty,
} from 'class-validator'
import { Currency } from './Currency'
import { MintErc721 } from './MintErc721'

export class CeloMintErc721 extends MintErc721 {

  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;

}
