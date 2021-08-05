import {IsNotEmpty, Length, Min, ValidateIf} from 'class-validator';
import {GenerateCustodialAddress} from './GenerateCustodialAddress';

export class GenerateTronCustodialAddress extends GenerateCustodialAddress {

    @ValidateIf(o => o.signatureId)
    @IsNotEmpty()
    @Length(34, 34)
    public from?: string;

    @IsNotEmpty()
    @Min(0)
    public feeLimit: number;
}
