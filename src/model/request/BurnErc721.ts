import {IsIn, IsInt, IsNotEmpty, IsOptional, Length, MaxLength, Min, ValidateIf,} from 'class-validator';
import {Currency} from './Currency';

export class BurnErc721 {

    @IsNotEmpty()
    @Length(66, 66)
    public fromPrivateKey: string;

    @IsNotEmpty()
    @MaxLength(256)
    public tokenId: string;

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @Min(0)
    @IsInt()
    @IsOptional()
    public nonce?: number;

    @IsNotEmpty()
    @ValidateIf(o => o.chain === Currency.CELO)
    @IsIn([Currency.CELO, Currency.CUSD])
    public feeCurrency: Currency;

    @IsNotEmpty()
    @IsIn([Currency.ETH, Currency.CELO])
    public chain: Currency;
}
