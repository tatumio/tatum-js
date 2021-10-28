import { PrivateKeyOrSignatureId } from '@tatum/tatum-core';
import { IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, } from 'class-validator';

export class AlgoTransferFT extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsNotEmpty()
    @Length(58, 58)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    public amount: string;

    @IsOptional()
    @MaxLength(30)
    public note: string;

    @IsNotEmpty()
    @IsNumberString()
    public contractAddress: string;
}