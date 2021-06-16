import {IsIn, IsInt, IsNotEmpty, IsOptional, Length, MaxLength, Min,} from 'class-validator';
import {Currency} from './Currency';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class BurnMultiToken extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 43)
    public account: string;

    @IsNotEmpty()
    @MaxLength(256)
    public tokenId: string;

    @IsNotEmpty()
    public amount: string;

    @IsNotEmpty()
    @Length(42, 43)
    public contractAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE])
    public chain: Currency;

    @Min(0)
    @IsInt()
    @IsOptional()
    public nonce?: number;

}
