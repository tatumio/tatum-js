import { BaseMintErc721, Currency } from '@tatumio/tatum-core'
import { IsIn, IsOptional } from 'class-validator'

export class CeloMintErc721 extends BaseMintErc721 {
  @IsOptional()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency? = Currency.CELO
}
