import {IsNotEmpty, IsUUID, Length, Max, Min, ValidateIf, IsInt} from 'class-validator';

export class CreateTronTrc10 {

    @ValidateIf(o => !(o.from || o.signatureId))
    @IsNotEmpty()
    @Length(64, 64)
    public fromPrivateKey?: string;

    @ValidateIf(o => !o.fromPrivateKey)
    @IsNotEmpty()
    @Length(34, 34)
    public from?: string;

    @ValidateIf(o => !o.fromPrivateKey)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;

    @ValidateIf(o => o.signatureId)
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    public index?: number;

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
