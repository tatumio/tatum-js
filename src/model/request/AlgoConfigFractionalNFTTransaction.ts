import { PrivateKeyOrSignatureId } from "./PrivateKeyOrSignatureId";
import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength, } from 'class-validator';

export class AlgoConfigFractionalNFTTransaction extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsOptional()
    @MaxLength(30)
    public note: string;

    @IsNotEmpty()
    @IsNumberString()
    public assetIndex: string;

    @IsOptional()
    @Length(58, 58)
    public manager: string;

    @IsOptional()
    @Length(58, 58)
    public reserve: string;

    @IsOptional()
    @Length(58, 58)
    public freeze: string;

    @IsOptional()
    @Length(58, 58)
    public clawback: string;

    @IsOptional()
    @IsBoolean()
    public strictEmptyAddressChecking: boolean;

    @IsOptional()
    @Length(58, 58)
    public rekeyTo: string;
}