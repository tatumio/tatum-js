import {IsIn, IsOptional, Length} from 'class-validator';
import {Fiat} from '..';
import {Country} from './Country';

export class CustomerUpdate {

    @Length(2, 2)
    @IsOptional()
    @IsIn(Object.keys(Country))
    public customerCountry?: Country;

    @Length(3, 3)
    @IsOptional()
    @IsIn(Object.keys(Fiat))
    public accountingCurrency?: Fiat;

    @Length(2, 2)
    @IsOptional()
    @IsIn(Object.keys(Country))
    public providerCountry?: Country;

    @Length(1, 100)
    public externalId: string;
}
