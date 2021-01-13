import {IsNotEmpty, Length, Max, Min} from 'class-validator';

export class CreateTronTrc20 {

    @IsNotEmpty()
    @Length(64, 64)
    public fromPrivateKey: string;

    @IsNotEmpty()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @Length(34, 34)
    public recipient: string;

    @IsNotEmpty()
    @Length(1, 100)
    public symbol: string;

    @IsNotEmpty()
    @Min(0)
    public totalSupply: number;

    @IsNotEmpty()
    @Min(0)
    @Max(30)
    public decimals: number;
}
