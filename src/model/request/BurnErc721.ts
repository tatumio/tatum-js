import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, MaxLength, Min, ValidateIf } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class BurnErc721 extends PrivateKeyOrSignatureId {

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
    @IsInt()
    @IsOptional()
    public nonce?: number;

    @ValidateIf(o => o.chain === Currency.ALGO && o.signatureId)
    @IsNotEmpty()
    @Length(42, 58)
    public from?: string;
}
