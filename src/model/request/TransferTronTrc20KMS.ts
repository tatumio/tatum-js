import {IsNotEmpty, IsNumberString, Length, Matches, Min} from 'class-validator';

export class TransferTronTrc20KMS {

    @IsNotEmpty()
    @Length(34, 34)
    public from: string;

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
