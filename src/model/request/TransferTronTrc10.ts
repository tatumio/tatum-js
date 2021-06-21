import {IsNotEmpty, IsNumberString, IsUUID, Length, Matches, ValidateIf, Min, IsInt} from 'class-validator';

export class TransferTronTrc10 {

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
    @Length(34, 34)
    public to: string;

    @IsNotEmpty()
    @Length(1, 100)
    public tokenId: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;
}
