import {IsHexadecimal, IsIn, IsInt, IsNotEmpty, IsNumberString, IsUUID, Length, Matches, Max, Min, Validate, ValidateIf} from 'class-validator';
import {SignatureIdValidator} from '../validation/SignatureIdValidator';
import {Currency} from './Currency';

export class TransferFlow {

    @IsNotEmpty()
    @IsHexadecimal()
    @Length(18, 18)
    public account: string;

    @Length(1, 500)
    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || (o.index >= 0 && o.privateKey))
    @IsNotEmpty()
    public mnemonic?: string;

    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || o.mnemonic)
    @Min(0)
    @IsNotEmpty()
    @IsInt()
    @Max(2147483647)
    public index?: number;

    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || (!o.mnemonic && !o.signatureId && !o.index))
    @Length(64, 64)
    @IsNotEmpty()
    public privateKey?: string;

    @ValidateIf(o => !o.mnemonic && !o.privateKey)
    @Validate(SignatureIdValidator)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;

    @IsNotEmpty()
    @IsHexadecimal()
    @Length(18, 18)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @IsNotEmpty()
    @IsIn([Currency.FLOW, Currency.FUSD])
    public currency: Currency;
}
