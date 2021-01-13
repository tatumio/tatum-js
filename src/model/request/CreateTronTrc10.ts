import {IsNotEmpty, Length, Min} from 'class-validator';

export class CreateTronTrc10 {

    @IsNotEmpty()
    @Length(64, 64)
    public fromPrivateKey: string;

    @IsNotEmpty()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @Length(1, 100)
    public abbreviation: string;

    @IsNotEmpty()
    @Length(1, 100)
    public description: string;

    @IsNotEmpty()
    @Length(1, 100)
    public url: string;

    @IsNotEmpty()
    public trxRatio: number;

    @IsNotEmpty()
    public tokenRatio: number;

    @IsNotEmpty()
    @Min(0)
    public totalSupply: number;
}
