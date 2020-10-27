import {IsNotEmpty, IsUUID, Length, ValidateIf,} from 'class-validator';
import {BaseTransferEthErc20Offchain} from './BaseTransferEthErc20Offchain';

export class TransferEthErc20OffchainKMS extends BaseTransferEthErc20Offchain {

    @ValidateIf(o => !o.mnemonic && !o.privateKey)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;
}
