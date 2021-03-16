import {Currency} from '@tatumio/tatum';
import {IsIn, IsNotEmpty} from 'class-validator';

export class PathChain {

    @IsNotEmpty()
    @IsIn([Currency.ETH, Currency.CELO])
    public chain: Currency;
}
