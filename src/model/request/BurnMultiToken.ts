import {IsIn, IsInt, IsNotEmpty, IsOptional, Length, MaxLength, Min,} from 'class-validator';
import {Currency} from './Currency';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class BurnMultiToken extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @MaxLength(256)
    public tokenId: string;

    @IsNotEmpty()
    public amount: string;

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO])
    public chain: Currency;

    @IsOptional()
    public data: string;

    @Min(0)
    @IsInt()
    @IsOptional()
    public nonce?: number;

}
