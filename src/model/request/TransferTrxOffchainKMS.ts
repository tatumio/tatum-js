import {IsNotEmpty, IsUUID, Length, ValidateIf} from 'class-validator';
import {CreateWithdrawal} from './CreateWithdrawal';

export class TransferTrxOffchainKMS extends CreateWithdrawal {

    @ValidateIf(o => o.signatureId)
    @Length(34, 34)
    @IsNotEmpty()
    public from?: string;

    @ValidateIf(o => !o.mnemonic && !o.fromPrivateKey)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;
}
