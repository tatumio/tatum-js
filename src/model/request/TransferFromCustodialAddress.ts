import {Type} from 'class-transformer'
import {IsIn, IsNotEmpty, IsNumberString, IsOptional, Min, ValidateIf} from 'class-validator'
import {ContractType} from './ContractType'
import {Currency} from './Currency'
import {Fee} from './Fee'
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId'

export class TransferFromCustodialAddress extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    public custodialAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.ETH, Currency.MATIC, Currency.BSC, Currency.ONE, Currency.CELO, Currency.TRON])
    public chain: Currency;

    @ValidateIf(o => o.contractType !== ContractType.NATIVE_ASSET)
    @IsNotEmpty()
    public tokenAddress: string;

    @IsIn(Object.values(ContractType))
    @IsNotEmpty()
    public contractType: ContractType;

    @IsNotEmpty()
    public recipient: string;

    @ValidateIf(o => o.contractType !== ContractType.NON_FUNGIBLE_TOKEN)
    @IsNotEmpty()
    @IsNumberString()
    public amount: string;

    @ValidateIf(o => o.contractType !== ContractType.NATIVE_ASSET && o.contractType !== ContractType.FUNGIBLE_TOKEN)
    @IsNotEmpty()
    @IsNumberString()
    public tokenId: string;

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
