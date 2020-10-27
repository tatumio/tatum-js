import {IsInt, IsNotEmpty, IsOptional, Length, MaxLength, Min, Validate, ValidateIf,} from 'class-validator';
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

    @MaxLength(50000)
    @IsOptional()
    public data?: string;
}
