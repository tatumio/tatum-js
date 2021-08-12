import {IsNotEmpty, IsOptional, IsUUID, Length, MaxLength, ValidateIf,} from 'class-validator'
import {BaseTransferEthErc20Offchain} from './BaseTransferEthErc20Offchain'

export class TransferEthOffchainKMS extends BaseTransferEthErc20Offchain {

    @ValidateIf(o => !o.mnemonic && !o.privateKey)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;

    @MaxLength(50000)
    @IsOptional()
    public data?: string;
}
