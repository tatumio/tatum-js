import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsOptional, Length, MaxLength, Min, ValidateNested} from 'class-validator';
import {Currency} from './Currency';
import {Fee} from './Fee';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class MintMultiToken extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 43)
    public to: string;

    @IsNotEmpty()
    @MaxLength(256)
    public tokenId: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE])
    public chain: Currency;

    @IsNotEmpty()
    @Length(42, 43)
    public contractAddress: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsOptional()
    public data: string;

    @IsNotEmpty()
    public amount: string;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;

}
