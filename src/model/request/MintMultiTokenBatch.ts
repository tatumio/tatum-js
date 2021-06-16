import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateNested} from 'class-validator';
import {Currency} from './Currency';
import {Fee} from './Fee';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class MintMultiTokenBatch extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    public to: string[];

    @IsNotEmpty()
    public tokenId: string[][];

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE])
    public chain: Currency;

    @IsNotEmpty()
    @Length(42, 43)
    public contractAddress: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsNotEmpty()
    public amounts: string[][];

    @IsOptional()
    public data: string;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}
