import {Type} from 'class-transformer';
import {
    IsIn,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    Length,
    Matches,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';
import {Currency, ETH_BASED_CURRENCIES} from './Currency';
import { TransferErc20 } from './TransferErc20'

export class TransferEthErc20 extends TransferErc20 {
    @IsNotEmpty()
    @IsIn([...ETH_BASED_CURRENCIES, Currency.XDC])
    public currency: Currency;
}
