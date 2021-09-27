import {IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, Max, MaxLength, Min,} from 'class-validator'
import {Currency} from './Currency'
import { DeployErc20 } from './DeployErc20'

export class DeployCeloErc20 extends DeployErc20 {

    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency: Currency;
}
