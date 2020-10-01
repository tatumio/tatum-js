import {IsIn, IsNotEmpty, IsNumberString, IsString, Length, Matches, MaxLength, MinLength} from 'class-validator';
import {TradeType} from './TradeType';

export class OrderBookRequest {

    @IsNotEmpty()
    @IsIn(Object.keys(TradeType))
    public type: TradeType;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    @MaxLength(38)
    public price: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    @MaxLength(38)
    public amount: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-a-zZ0-9_\-]+\/[A-Za-z0-9_\-]+$/)
    @MinLength(3)
    @MaxLength(30)
    public pair: string;

    @IsNotEmpty()
    @IsString()
    @Length(24, 24)
    public currency1AccountId: string;

    @IsNotEmpty()
    @IsString()
    @Length(24, 24)
    public currency2AccountId: string;
}
