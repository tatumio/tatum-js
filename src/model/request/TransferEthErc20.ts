import {IsIn, IsNotEmpty,} from 'class-validator'
import {Currency, ETH_BASED_CURRENCIES, MATIC_BASED_CURRENCIES} from './Currency'
import {TransferErc20} from './TransferErc20'

export class TransferEthErc20 extends TransferErc20 {
    @IsNotEmpty()
    @IsIn([...ETH_BASED_CURRENCIES, Currency.XDC, Currency.MATIC, ...MATIC_BASED_CURRENCIES])
    public currency: Currency;
}
