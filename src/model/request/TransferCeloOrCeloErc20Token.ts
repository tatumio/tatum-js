import {
    IsIn,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsUUID,
    Length,
    Matches,
    MaxLength,
    Min,
    Validate,
    ValidateIf,
} from 'class-validator';
import {SignatureIdValidator} from '../validation/SignatureIdValidator';
import {Currency} from './Currency';

export class TransferCeloOrCeloErc20Token {

    @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.signatureId)
    @Validate(SignatureIdValidator)
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

    @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.fromPrivateKey)
    @Validate(SignatureIdValidator)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;
}
