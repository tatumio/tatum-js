import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateNested} from 'class-validator';
import {Currency} from './Currency';
import {Fee} from './Fee';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class TransferMultiTokenBatch extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 43)
    public to: string;

    @IsNotEmpty()
    public tokenId: string[];

    @IsNotEmpty()
    @Length(42, 43)
    public contractAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC])
    public chain: Currency;

    @IsNotEmpty()
    public amounts: string[];

    @IsOptional()
    public data: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}
