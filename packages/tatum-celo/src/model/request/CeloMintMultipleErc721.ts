import { BaseMintMultipleErc721, Currency } from '@tatumio/tatum-core';
import {IsIn, IsNotEmpty} from 'class-validator'

export class CeloMintMultipleErc721 extends BaseMintMultipleErc721 {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
