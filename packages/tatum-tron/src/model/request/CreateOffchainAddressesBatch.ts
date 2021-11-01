import {Type} from 'class-transformer'
import {IsNotEmpty, IsOptional, Length, Max, Min, ValidateNested} from 'class-validator'

export class AddressQuery {

    @IsNotEmpty()
    @Length(24, 24)
    public accountId: string;

    @IsOptional()
    @Min(0)
    @Max(2147483647)
    public derivationKey?: number;
}

export class AddressBatch {

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => AddressQuery)
    public addresses: AddressQuery[];
}
