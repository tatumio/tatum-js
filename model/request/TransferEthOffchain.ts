import {
    IsBoolean,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    Length,
    Matches,
    MaxLength,
    Min,
    ValidateIf,
} from 'class-validator';
import {Currency, ETH_BASED_CURRENCIES} from './Currency';

export class TransferEthOffchain {

    @IsNotEmpty()
    @Length(24, 24)
    public senderAccountId: string;

    @IsNotEmpty()
    @Length(42, 42)
    public address: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @IsNotEmpty()
    @IsIn(ETH_BASED_CURRENCIES)
    public currency: Currency;

    @IsOptional()
    @IsBoolean()
    public compliant?: boolean;

    @Length(1, 100)
    @IsOptional()
    public paymentId?: string;

    @Length(1, 500)
    @IsOptional()
    public senderNote?: string;

    @Length(1, 500)
    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || o.index >= 0)
    @IsNotEmpty()
    public mnemonic: string;

    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || o.mnemonic)
    @Min(0)
    @IsNotEmpty()
    @IsInt()
    public index: number;

    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || (!o.mnemonic && !o.index))
    @Length(66, 66)
    @IsNotEmpty()
    public privateKey: string;

    @Min(0)
    @IsOptional()
    @IsInt()
    public nonce?: number;

    @MaxLength(50000)
    @IsOptional()
    public data?: string;
}
