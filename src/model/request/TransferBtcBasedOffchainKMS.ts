import {IsNotEmpty, IsUUID, Length, Validate} from 'class-validator';
import {TransferBtcOffchainValidator} from '../validation/TransferBtcOffchainValidator';
import {CreateWithdrawal} from './CreateWithdrawal';

export class TransferBtcBasedOffchainKMS extends CreateWithdrawal {

    @Length(1, 150)
    @IsNotEmpty()
    public xpub?: string;

    @Validate(TransferBtcOffchainValidator)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;
}
