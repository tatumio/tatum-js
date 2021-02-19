import {IsHexadecimal, IsNotEmpty, IsNumber, IsOptional, Length, MaxLength, Min} from 'class-validator';

export class TransferQuorum {

    @IsNotEmpty()
    @Length(42, 42)
    @IsHexadecimal()
    public from: string;

    @IsNotEmpty()
    @Length(42, 42)
    @IsHexadecimal()
    public to: string;

    @IsOptional()
    @IsHexadecimal()
    public value?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public nonce?: string;

    @IsOptional()
    @IsHexadecimal()
    @MaxLength(1e12)
    public data?: string;
}
