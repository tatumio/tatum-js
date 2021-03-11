import { IsIn, IsNotEmpty } from 'class-validator';
import { Currency } from './Currency'
import { MintMultipleErc721 } from './MintMultipleErc721'

export class CeloMintMultipleErc721 extends MintMultipleErc721 {

  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD])
  public feeCurrency: Currency;
}
