import {
    IsIn,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsUUID,
    Length,
    Min,
    Validate,
    ValidateIf,
} from 'class-validator';
import {SignatureIdValidator} from '../validation/SignatureIdValidator';
import {Currency} from './Currency';

export class MintCeloErc20 {

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
    public amount: string;

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD])
    public feeCurrency: Currency;

    @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.fromPrivateKey)
    @Validate(SignatureIdValidator)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;
}
