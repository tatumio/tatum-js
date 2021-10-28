import { PrivateKeyOrSignatureId } from "./PrivateKeyOrSignatureId";
import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Matches, MaxLength, } from 'class-validator';

export class AlgoCreateNFT extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsNotEmpty()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @Length(1, 30)
    public symbol: string;

    @IsOptional()
    @IsString()
    public url: string;

    @IsNotEmpty()
    @IsString()
    public assetMetadataHash: string;

    @IsOptional()
    @MaxLength(30)
    public note: string;
}