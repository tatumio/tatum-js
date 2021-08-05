import {IsNotEmpty, Length, Min, ValidateIf} from 'class-validator';
import {TransferFromCustodialAddress} from './TransferFromCustodialAddress';

export class TransferFromTronCustodialAddress extends TransferFromCustodialAddress {

    @ValidateIf(o => o.signatureId)
    @IsNotEmpty()
    @Length(34, 34)
    public from?: string;

    @IsNotEmpty()
    @Min(0)
    public feeLimit: number;
}
