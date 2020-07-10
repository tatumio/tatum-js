import {IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength} from 'class-validator';

export class BlockAmount {

    @IsNotEmpty()
    @IsNumberString()
    @MaxLength(38)
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @IsNotEmpty()
    @Length(1, 100)
    public type: string;

    @IsOptional()
    @Length(1, 300)
    public description?: string;
}
