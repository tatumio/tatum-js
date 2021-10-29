import { IsIn, IsNotEmpty, IsNumberString, ValidateIf, IsOptional, Length, MaxLength, Min } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class TransferErc721 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 58)
    public to: string;

    @IsNotEmpty()
    @MaxLength(256)
    public tokenId: string;

    @IsNotEmpty()
    @Length(1, 43)
    public contractAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.TRON, Currency.ONE, Currency.MATIC, Currency.ALGO])
    public chain: Currency;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsOptional()
    @IsNumberString()
    public value?: string;

    @IsOptional()
    @ValidateIf(o => o.provenanceData && o.tokenPrice && o.provenance)
    public provenance?: boolean;

    @IsOptional()
    @ValidateIf(o => o.provenanceData && o.tokenPrice && o.provenance)
    public provenanceData?: string;

    @IsOptional()
    @IsNumberString()
    @ValidateIf(o => o.provenanceData && o.tokenPrice && o.provenance)
    public tokenPrice?: string;

}
