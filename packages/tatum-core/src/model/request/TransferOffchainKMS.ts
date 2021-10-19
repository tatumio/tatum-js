import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsUUID,
	Length,
	Max,
	MaxLength,
	Min,
	ValidateIf,
} from 'class-validator';
import { BaseTransferErc20Offchain } from './BaseTransferErc20Offchain';

export class TransferOffchainKMS extends BaseTransferErc20Offchain {
	@ValidateIf((o) => !o.mnemonic && !o.privateKey)
	@Length(36, 36)
	@IsUUID('4')
	@IsNotEmpty()
	public signatureId?: string;

	@MaxLength(50000)
	@IsOptional()
	public data?: string;

	@Min(0)
	@IsInt()
	@Max(2147483647)
	@IsOptional()
	public index?: number;
}
