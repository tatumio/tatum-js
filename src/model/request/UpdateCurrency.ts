import {IsIn, IsNotEmpty, IsOptional, Length, Matches, Min} from 'class-validator';
import {Fiat} from '../response';
import {Currency} from './Currency';

export class UpdateCurrency {

    @IsNotEmpty()
    @Length(1, 30)
    @Matches(/^VC_[a-zA-Z0-9_]+$/)
    public name: string;

    @IsOptional()
    @Length(3, 5)
    @IsIn([...Object.keys(Currency), ...Object.keys(Fiat)])
    public basePair?: Currency | Fiat;

    @Min(0)
    @IsOptional()
    public baseRate?: number;
}
