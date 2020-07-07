import {IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength} from 'class-validator';

class VetFee {
    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public gasLimit: string;
}

export class TransferVet {

    @IsNotEmpty()
    @Length(66, 66)
    public fromPrivateKey: string;

    @IsNotEmpty()
    @Length(42, 42)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @MaxLength(10000)
    @IsOptional()
    public data?: string;

    @IsOptional()
    public fee?: VetFee;
}
