import { PrivateKeyOrSignatureId } from "./PrivateKeyOrSignatureId";
import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength, } from 'class-validator';

export class AlgoTransferNFTTransaction extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsNotEmpty()
    @Length(58, 58)
    public to: string;

    @IsOptional()
    @Length(58, 58)
    public closeRemainderTo: string;

    @IsOptional()
    @Length(58, 58)
    public revocationTarget: string;

    @IsOptional()
    @MaxLength(30)
    public note: string;

    @IsNotEmpty()
    @IsNumberString()
    public assetIndex: string;

    @IsOptional()
    @Length(58, 58)
    public rekeyTo: string;
}