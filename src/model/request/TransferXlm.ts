import {IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength} from 'class-validator'

export class TransferXlm {

    @IsNotEmpty()
    @Length(56, 56)
    public fromSecret: string;

    @IsNotEmpty()
    @Length(56, 56)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @IsOptional()
    public initialize: boolean;

    @MaxLength(64)
    @Matches(/^[ -~]{0,64}$/)
    @IsOptional()
    public message?: string;
}
