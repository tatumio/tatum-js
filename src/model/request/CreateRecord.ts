import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateIf, ValidateNested} from 'class-validator';
import {Currency} from './Currency';
import {Fee} from './Fee';

export class CreateRecord {

    @IsNotEmpty()
    @Length(1, 130000)
    public data: string;

    @IsNotEmpty()
    @IsIn([Currency.ETH, Currency.QUORUM])
    public chain: Currency;

    @IsOptional()
    @Length(32, 66)
    public fromPrivateKey?: string;

    @IsNotEmpty()
    @ValidateIf(o => o.chain === Currency.QUORUM)
    @Length(42, 42)
    public from: string;

    @ValidateIf(o => o.chain === Currency.QUORUM)
    @Length(42, 42)
    public to?: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public ethFee?: Fee;
}
