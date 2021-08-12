import {IsIn, IsNotEmpty,} from 'class-validator'
import {Currency} from './Currency'
import {TransferEthOffchain} from './TransferEthOffchain'

export class TransferCeloOffchain extends TransferEthOffchain {

    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency: Currency;
}
