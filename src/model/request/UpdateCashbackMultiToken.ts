import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, Min, ValidateNested} from 'class-validator';
import {Currency} from './Currency';
import {Fee} from './Fee';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class UpdateCashbackMultiToken extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 42)
    public author: string;

    @IsNotEmpty()
    @MaxLength(256)
    public tokenId: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO])
    public chain: Currency;

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsNotEmpty()
    @IsNumberString()
    public cashbackValue: string;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;

}
