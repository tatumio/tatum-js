import {IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, Min,} from 'class-validator';
import {Currency} from './Currency';
import { MintErc20 } from './MintErc20'

export class MintCeloErc20 extends MintErc20 {
    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency: Currency;
}
