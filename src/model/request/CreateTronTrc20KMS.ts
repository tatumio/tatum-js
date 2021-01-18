import {IsNotEmpty, IsUUID, Length, Max, Min} from 'class-validator';

export class CreateTronTrc20KMS {

    @IsNotEmpty()
    @Length(34, 34)
    public from: string;

    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId: string;

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
