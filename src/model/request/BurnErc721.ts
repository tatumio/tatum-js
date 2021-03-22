import {IsIn, IsInt, IsNotEmpty, IsOptional, Length, MaxLength, Min,} from 'class-validator';
import {Currency} from './Currency';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class BurnErc721 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @MaxLength(256)
    public tokenId: string;

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO])
    public chain: Currency;

    @Min(0)
    @IsInt()
    @IsOptional()
    public nonce?: number;
}
