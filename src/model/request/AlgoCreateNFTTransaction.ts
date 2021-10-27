import { PrivateKeyOrSignatureId } from "./PrivateKeyOrSignatureId";
import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Matches, MaxLength, } from 'class-validator';

export class AlgoCreateNFTTransaction extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

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
    @IsString()
    public uintName: string;

    @IsOptional()
    @IsString()
    public assetName: string;

    @IsOptional()
    @IsString()
    public assetURL: string;

    @IsNotEmpty()
    @IsString()
    public assetMetadataHash: string;

    @IsOptional()
    @MaxLength(30)
    public note: string;
}