import { CreateWithdrawal } from '@tatumio/tatum-core';
import {IsNotEmpty, IsUUID, Length} from 'class-validator'

export class TransferXlmOffchainKMS extends CreateWithdrawal {

    @IsNotEmpty()
    @Length(56, 56)
    public fromAccount: string;

    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;

}
