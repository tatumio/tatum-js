import {IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, Min} from 'class-validator';

export class EgldBasicTransaction {
    @IsNotEmpty()
    @Min(0)
    public nonce: number;

    @IsNotEmpty()
    @IsNumberString()
    public value: string;

    @IsNotEmpty()
    @Length(62, 62)
    public receiver: string;

    @IsNotEmpty()
    @Length(62, 62)
    public sender: string;

    @IsOptional()
    @MaxLength(130000)
    public data?: string;

    @IsNotEmpty()
    @MaxLength(128)
    public chainID: string;

    @IsNotEmpty()
    @Min(0)
    public version: number;
}
