import { Currency } from './Currency'
import { BaseMintErc721 } from './BaseMintErc721'
import { IsIn, IsOptional } from 'class-validator'

export class CeloMintErc721 extends BaseMintErc721 {
  @IsOptional()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency? = Currency.CELO
}
