import {Type} from 'class-transformer'
import {IsNotEmpty, IsUUID, Length, Validate, ValidateIf, ValidateNested} from 'class-validator'
import {TransferBtcOffchainValidator} from '../validation/TransferBtcOffchainValidator'
import { CreateWithdrawal } from '@tatumio/tatum-core';

export class KeyPair {

    @IsNotEmpty()
    @Length(30, 110)
    public address: string;

    @IsNotEmpty()
    @Length(52, 256)
    public privateKey: string;
}

const m = (o: TransferBtcBasedOffchain) => {
    if (o.mnemonic) {
        return true
    }
    if (!o.signatureId && !o.keyPair) {
        return true
    }
    if (o.xpub && !o.signatureId) {
        return true
    }
    if (!o.keyPair && !o.signatureId) {
        return true
    }
    return false
}

const k = (o: TransferBtcBasedOffchain) => {
    if (o.keyPair) {
        return true
    }
    if (!o.signatureId && !o.mnemonic) {
        return true
    }
    if (o.xpub && !(o.signatureId || o.mnemonic)) {
        return true
    }
    if (!o.mnemonic && !o.signatureId) {
        return true
    }
    return false
}

export class TransferBtcBasedOffchain extends CreateWithdrawal {

    @Length(1, 500)
    @ValidateIf(m)
    @Validate(TransferBtcOffchainValidator)
    @IsNotEmpty()
    public mnemonic?: string;

    @Length(1, 256)
    @ValidateIf(o => (o.mnemonic || o.signatureId) && !o.attr)
    @IsNotEmpty()
    public xpub?: string;

    @ValidateIf(k)
    @Validate(TransferBtcOffchainValidator)
    @IsNotEmpty()
    @Type(() => KeyPair)
    @ValidateNested({each: true})
    public keyPair?: KeyPair[];

    @ValidateIf(o => !o.mnemonic && !o.keyPair)
    @Validate(TransferBtcOffchainValidator)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;
}
