import {IsNotEmpty, Length, Max, Min} from 'class-validator';

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
    @Min(0)
    public totalSupply: number;

    @IsNotEmpty()
    @Min(0)
    @Max(5)
    public decimals: number;
}
