import {IsNotEmpty, Length, Min, ValidateIf} from 'class-validator';
import {Currency} from './Currency';
import {UpdateMarketplaceFee} from './UpdateMarketplaceFee';

export class UpdateTronMarketplaceFee extends UpdateMarketplaceFee {

    @ValidateIf(o => o.signatureId && o.chain === Currency.TRON)
    @IsNotEmpty()
    @Length(34, 34)
    public from?: string;

    @ValidateIf(o => o.chain === Currency.TRON)
    @IsNotEmpty()
    @Min(0)
    public feeLimit: number;
}
