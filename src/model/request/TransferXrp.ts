import {IsInt, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, Min} from 'class-validator'

export class TransferXrp {

    @IsNotEmpty()
    @Length(33, 34)
    public fromAccount: string;

    @IsNotEmpty()
    @Length(29, 29)
    public fromSecret: string;

    @IsNotEmpty()
    @Length(33, 34)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @IsNumberString()
    @IsOptional()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public fee?: string;

    @Min(0)
    @IsOptional()
    @IsInt()
    public sourceTag?: number;

    @Min(0)
    @IsOptional()
    @IsInt()
    public destinationTag?: number;
}
