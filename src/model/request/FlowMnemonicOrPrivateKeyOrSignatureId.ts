import {IsInt, IsNotEmpty, IsUUID, Length, Max, Min, Validate, ValidateIf} from 'class-validator'
import {SignatureIdValidator} from '../validation/SignatureIdValidator'

export class FlowMnemonicOrPrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(18, 18)
    public account: string;

    @Length(1, 500)
    @ValidateIf(o => (!o.signatureId && !o.privateKey) || o.mnemonic)
    @IsNotEmpty()
    public mnemonic?: string;

    @ValidateIf(o => ( o.mnemonic))
    @Min(0)
    @IsNotEmpty()
    @IsInt()
    @Max(2147483647)
    public index?: number;

    @ValidateIf(o => (!o.mnemonic &&!o.index && !o.privateKey))
    @Length(64, 64)
    @IsNotEmpty()
    public privateKey?: string;

    @ValidateIf(o => !o.mnemonic && !o.privateKey)
    @Validate(SignatureIdValidator)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;
}
