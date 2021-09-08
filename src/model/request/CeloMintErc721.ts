import { Currency } from './Currency'
import { MintErc721 } from './MintErc721'
import { IsIn, IsOptional } from 'class-validator'

export class CeloMintErc721 extends MintErc721 {

    @IsOptional()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency? = Currency.CELO;

}
