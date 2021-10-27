import { PrivateKeyOrSignatureId } from "./PrivateKeyOrSignatureId";
import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength, } from 'class-validator';

export class AlgoCreateFractionalNFTTransaction extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsNotEmpty()
    @IsNumberString()
    public total: string;

    @IsNotEmpty()
    @IsNumberString()
    public decimals: string;

    @IsNotEmpty()
    @IsBoolean()
    public defaultFrozen: boolean;

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
    public uintName: string;

    @IsOptional()
    public assetName: string;

    @IsOptional()
    public assetURL: string;

    @IsNotEmpty()
    public assetMetadataHash: string;

    @IsOptional()
    @MaxLength(30)
    public note: string;
}