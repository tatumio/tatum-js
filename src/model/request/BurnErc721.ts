import {IsIn, IsInt, IsNotEmpty, IsOptional, Length, MaxLength, Min,IsBoolean} from 'class-validator'
import {Currency} from './Currency'
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId'

export class BurnErc721 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @MaxLength(256)
    public tokenId: string;

    @IsNotEmpty()
    @Length(42, 43)
    public contractAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.TRON, Currency.ONE, Currency.MATIC])
    public chain: Currency;

    @Min(0)
    @IsInt()
    @IsOptional()
    public nonce?: number;

    @IsOptional()
    @IsBoolean()
    public provenance?: boolean;
}
