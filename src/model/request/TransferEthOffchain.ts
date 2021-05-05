import {IsInt, IsNotEmpty, IsOptional, IsUUID, Length, MaxLength, Min, Validate, ValidateIf,} from 'class-validator';
import {SignatureIdValidator} from '../validation/SignatureIdValidator';
import {TransferEthOffchainValidator} from '../validation/TransferEthOffchainValidator';
import {BaseTransferEthErc20Offchain} from './BaseTransferEthErc20Offchain';

export class TransferEthOffchain extends BaseTransferEthErc20Offchain {

    @Length(1, 500)
    @Validate(TransferEthOffchainValidator)
    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || o.index >= 0)
    @IsNotEmpty()
    public mnemonic?: string;

    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || o.mnemonic)
    @Validate(TransferEthOffchainValidator)
    @Min(0)
    @IsNotEmpty()
    @IsInt()
    public index?: number;

    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || (!o.mnemonic && !o.index))
    @Validate(TransferEthOffchainValidator)
    @Length(66, 66)
    @IsNotEmpty()
    public privateKey?: string;

    @ValidateIf(o => (o.privateKey && o.signatureId) || !o.privateKey)
    @Validate(SignatureIdValidator)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;

    @MaxLength(50000)
    @IsOptional()
    public data?: string;
}
