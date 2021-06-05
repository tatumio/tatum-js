import {IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min,} from 'class-validator';
import {Currency} from './Currency';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class BurnMultiTokenBatch extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    public tokenId: string[];

    @IsNotEmpty()
    public amounts: string[];

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
