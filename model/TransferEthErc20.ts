import {Type} from 'class-transformer';
import {
    IsIn,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    Length,
    Matches,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';
import {Currency, ETH_BASED_CURRENCIES} from './Currency';
import {Fee} from './Fee';

export class TransferEthErc20 {

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
    @IsIn(ETH_BASED_CURRENCIES)
    public currency: Currency;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
