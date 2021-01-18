import {IsNotEmpty, IsNumberString, IsUUID, Length, Matches} from 'class-validator';

export class TransferTronTrc10KMS {

    @IsNotEmpty()
    @Length(34, 34)
    public from: string;

    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId: string;

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
