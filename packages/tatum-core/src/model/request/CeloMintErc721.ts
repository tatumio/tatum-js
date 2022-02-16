import { Currency } from './Currency'
import { IsIn, IsOptional } from 'class-validator'
import { EthMintErc721 } from './EthMintErc721'

export class CeloMintErc721 extends EthMintErc721 {
  @IsOptional()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency? = Currency.CELO
}
