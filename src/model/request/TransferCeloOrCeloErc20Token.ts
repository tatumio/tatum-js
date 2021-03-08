import {IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength, Min,} from 'class-validator';
import {Currency} from './Currency';

export class TransferCeloOrCeloErc20Token {

    @IsNotEmpty()
    @Length(66, 66)
    public fromPrivateKey: string;

    @IsNotEmpty()
    @Length(42, 42)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @MaxLength(130000)
    @IsOptional()
    public data?: string;

    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD])
    public currency: Currency;

    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD])
    public feeCurrency: Currency;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
