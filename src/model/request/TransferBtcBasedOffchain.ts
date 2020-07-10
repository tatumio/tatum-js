import {Type} from 'class-transformer';
import {IsNotEmpty, Length, Validate, ValidateIf, ValidateNested} from 'class-validator';
import {TransferBtcOffchainValidator} from '../validation/TransferBtcOffchainValidator';
import {CreateWithdrawal} from './CreateWithdrawal';

export class KeyPair {

    @IsNotEmpty()
    @Length(30, 50)
    public address: string;

    @IsNotEmpty()
    @Length(52, 52)
    public private: string;
}

export class TransferBtcBasedOffchain extends CreateWithdrawal {

    @Length(1, 500)
    @Validate(TransferBtcOffchainValidator)
    @ValidateIf(o => (o.mnemonic && o.keyPair) || !o.keyPair)
    @IsNotEmpty()
    public mnemonic: string;

    @ValidateIf(o => (o.mnemonic && o.keyPair) || !o.mnemonic)
    @Validate(TransferBtcOffchainValidator)
    @IsNotEmpty()
    @Type(() => KeyPair)
    @ValidateNested({each: true})
    public keyPair: KeyPair[];
}
