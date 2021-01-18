import {IsNotEmpty, IsNumberString, Length, Matches} from 'class-validator';

export class TransferTronKMS {

    @IsNotEmpty()
    @Length(34, 34)
    public from: string;

    @IsNotEmpty()
    @Length(34, 34)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;
}
