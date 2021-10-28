import { PrivateKeyOrSignatureId } from '@tatum/tatum-core';
import { IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, } from 'class-validator';

export class AlgoBurnFT extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsOptional()
    @MaxLength(30)
    public note: string;

    @IsNotEmpty()
    @IsNumberString()
    public contractAddress: string;
}