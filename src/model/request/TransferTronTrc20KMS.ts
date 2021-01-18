import {IsNotEmpty, IsNumberString, IsUUID, Length, Matches, Min} from 'class-validator';

export class TransferTronTrc20KMS {

    @IsNotEmpty()
    @Length(34, 34)
    public from: string;

    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId: string;

    @IsNotEmpty()
    @Length(34, 34)
    public to: string;

    @IsNotEmpty()
    @Length(34, 34)
    public tokenAddress: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @IsNotEmpty()
    @Min(0)
    public feeLimit: number;
}
