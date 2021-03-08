import {IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateIf} from 'class-validator';
import {Currency} from './Currency';

export class DeployErc721 {

    @IsNotEmpty()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @Length(1, 30)
    public symbol: string;

    @IsNotEmpty()
    @Length(66, 66)
    public fromPrivateKey: string;

    @IsNotEmpty()
    @ValidateIf(o => o.chain === Currency.CELO)
    @IsIn([Currency.CELO, Currency.CUSD])
    public feeCurrency: Currency;

    @IsNotEmpty()
    @IsIn([Currency.ETH, Currency.CELO])
    public chain: Currency;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
