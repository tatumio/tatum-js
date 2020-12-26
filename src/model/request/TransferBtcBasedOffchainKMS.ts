import {IsNotEmpty, IsUUID, Length, Validate, ValidateIf} from 'class-validator';
import {TransferBtcOffchainValidator} from '../validation/TransferBtcOffchainValidator';
import {CreateWithdrawal} from './CreateWithdrawal';

export class TransferBtcBasedOffchainKMS extends CreateWithdrawal {

    @Length(1, 150)
    @ValidateIf(o => !o.attr)
    @IsNotEmpty()
    public xpub?: string;

    @Validate(TransferBtcOffchainValidator)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;
}
