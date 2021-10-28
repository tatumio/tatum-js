import { PrivateKeyOrSignatureId, Currency } from '@tatum/tatum-core';
import { IsNotEmpty, IsOptional, IsString, Length, MaxLength, IsIn} from 'class-validator';

export class AlgoCreateNFT extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @IsIn([Currency.ALGO])
    public chain: Currency;

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