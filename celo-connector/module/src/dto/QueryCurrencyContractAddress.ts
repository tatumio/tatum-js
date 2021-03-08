import { Currency } from '@tatumio/tatum';
import {IsOptional, Length} from 'class-validator';

export class QueryCurrencyContractAddress {
    @IsOptional()
    @Length(3, 5)
    public currency?: Currency;

    @IsOptional()
    @Length(42, 42)
    public contractAddress?: string;
}
