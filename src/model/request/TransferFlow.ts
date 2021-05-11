import {IsHexadecimal, IsIn, IsNotEmpty, IsNumberString, Length, Matches} from 'class-validator';
import {Currency} from './Currency';

export class TransferFlow {

    @IsNotEmpty()
    @IsHexadecimal()
    @Length(18, 18)
    public fromAccount: string;

    @IsNotEmpty()
    @Length(64, 64)
    public fromSecret: string;

    @IsNotEmpty()
    @IsHexadecimal()
    @Length(18, 18)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @IsNotEmpty()
    @IsIn([Currency.FLOW, Currency.FUSD])
    public currency: Currency;
}
