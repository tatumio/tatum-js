import {IsNotEmpty, IsNumberString, Length, Matches} from 'class-validator';

export class TransferTronTrc10KMS {

    @IsNotEmpty()
    @Length(34, 34)
    public from: string;

    @IsNotEmpty()
    @Length(34, 34)
    public to: string;

    @IsNotEmpty()
    @Length(1, 100)
    public tokenId: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;
}
