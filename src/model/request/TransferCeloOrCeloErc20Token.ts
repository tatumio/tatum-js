import {
    IsIn,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    Length,
    Matches,
    MaxLength,
    Min,
    ValidateIf,
} from 'class-validator';
import {Currency} from './Currency';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class TransferCeloOrCeloErc20Token extends PrivateKeyOrSignatureId {

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

    @ValidateIf(o => !o.contractAddress)
    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD])
    public currency: Currency;

    @ValidateIf(o => !o.currency)
    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD])
    public feeCurrency: Currency;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
