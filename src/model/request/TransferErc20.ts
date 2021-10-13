import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, Max, MaxLength, Min, ValidateIf, ValidateNested} from 'class-validator';
import {BSC_BASED_CURRENCIES, Currency, ETH_BASED_CURRENCIES, MATIC_BASED_CURRENCIES} from './Currency';
import {Fee} from './Fee';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class TransferErc20 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 43)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @MaxLength(130000)
    @IsOptional()
    public data?: string;

    @ValidateIf(o => !o.contractAddress)
    @IsNotEmpty()
    @IsIn([...ETH_BASED_CURRENCIES, ...MATIC_BASED_CURRENCIES, Currency.XDC, Currency.ONE, ...BSC_BASED_CURRENCIES])
    public currency?: Currency;

    @ValidateIf(o => !o.currency)
    @IsNotEmpty()
    @Length(42, 43)
    public contractAddress?: string;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;

    @ValidateIf(o => !o.currency)
    @Min(1)
    @Max(30)
    public digits?: number;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
