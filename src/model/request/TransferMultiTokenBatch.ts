import { IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, Min, ValidateNested } from 'class-validator';
import { Currency } from './Currency';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId';
import { Fee } from './Fee'
import { Type } from 'class-transformer'

export class TransferMultiTokenBatch extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 42)
    public to: string;

    @IsNotEmpty()
    public tokenId: string[];

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO])
    public chain: Currency;

    @IsNotEmpty()
    public amounts: string[];

    @IsNotEmpty()
    public data: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsOptional()
    @IsNumberString()
    public value?: string;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}