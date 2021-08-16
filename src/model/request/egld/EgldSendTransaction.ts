import {IsHexadecimal, IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, Min} from 'class-validator';

// import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class EgldSendTransaction {
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

    @IsNotEmpty()
    @Min(0)
    public gasPrice: number;

    @IsNotEmpty()
    @Min(0)
    public gasLimit: number;

    @IsOptional()
    @MaxLength(130000)
    @IsHexadecimal()
    public data?: string;

    @IsNotEmpty()
    @MaxLength(128)
    public chainID: string;

    @IsNotEmpty()
    @Min(0)
    public version: number;

    @IsOptional()
    public signature?: string;
}
