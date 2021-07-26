import {IsNotEmpty, Length, Min, ValidateIf} from 'class-validator';
import {TransferFromCustodialAddressBatch} from './TransferFromCustodialAddressBatch';

export class TransferFromTronCustodialAddressBatch extends TransferFromCustodialAddressBatch {

    @ValidateIf(o => o.signatureId)
    @IsNotEmpty()
    @Length(34, 34)
    public from?: string;

    @IsNotEmpty()
    @Min(0)
    public feeLimit: number;
}
