import {Type} from 'class-transformer'
import {IsArray, IsIn, IsNotEmpty, IsOptional, Min, Validate, ValidateIf} from 'class-validator'
import {CustodialBatchTransferValidator} from '../validation/CustodialBatchTransferValidator'
import {ContractType} from './ContractType'
import {Currency} from './Currency'
import {Fee} from './Fee'
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId'

export class TransferFromCustodialAddressBatch extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    public custodialAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.ETH, Currency.MATIC, Currency.BSC, Currency.ONE, Currency.CELO, Currency.TRON])
    public chain: Currency;

    @Validate(CustodialBatchTransferValidator)
    @ValidateIf(o => o.contractType !== ContractType.NATIVE_ASSET)
    @IsArray()
    @IsNotEmpty()
    public tokenAddress: string[];

    @Validate(CustodialBatchTransferValidator)
    @IsArray()
    @IsNotEmpty()
    public contractType: ContractType[];

    @IsNotEmpty()
    @Validate(CustodialBatchTransferValidator)
    @IsArray()
    public recipient: string[];

    @Validate(CustodialBatchTransferValidator)
    @ValidateIf(o => o.contractType !== ContractType.NON_FUNGIBLE_TOKEN)
    @IsNotEmpty()
    @IsArray()
    public amount: string[];

    @ValidateIf(o => o.contractType !== ContractType.NATIVE_ASSET && o.contractType !== ContractType.FUNGIBLE_TOKEN)
    @IsNotEmpty()
    @Validate(CustodialBatchTransferValidator)
    @IsArray()
    public tokenId: string[];

    @IsOptional()
    @Min(0)
    public nonce?: number;

    @IsOptional()
    @Type(() => Fee)
    public fee?: Fee;

    @IsOptional()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency?: Currency;
}
