import {IsNotEmpty, IsNumberString, Length, Matches, Min} from 'class-validator';

export class TransferTronTrc20 {

    @IsNotEmpty()
    @Length(64, 64)
    public fromPrivateKey: string;

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
