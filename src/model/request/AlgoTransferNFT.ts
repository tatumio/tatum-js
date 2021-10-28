import { PrivateKeyOrSignatureId } from "./PrivateKeyOrSignatureId";
import { IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, } from 'class-validator';

export class AlgoTransferNFT extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsNotEmpty()
    @Length(58, 58)
    public to: string;

    @IsOptional()
    @MaxLength(30)
    public note: string;

    @IsNotEmpty()
    @IsNumberString()
    public contractAddress: string;
}