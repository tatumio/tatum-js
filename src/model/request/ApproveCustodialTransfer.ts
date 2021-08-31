import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, Min, ValidateNested,} from 'class-validator';
import {ContractType} from './ContractType';
import {Currency} from './Currency';
import {Fee} from './Fee';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class ApproveCustodialTransfer extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 43)
    public custodialAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.ETH, Currency.MATIC, Currency.BSC, Currency.ONE, Currency.CELO])
    public chain: Currency;

    @IsIn([ContractType.NON_FUNGIBLE_TOKEN, ContractType.SEMI_FUNGIBLE_TOKEN, ContractType.FUNGIBLE_TOKEN])
    @IsNotEmpty()
    public contractType: ContractType;

    @IsNotEmpty()
    @Length(42, 43)
    public tokenAddress: string;

    @IsNotEmpty()
    @Length(42, 43)
    public spender: string;

    @IsOptional()
    @IsNumberString()
    public tokenId?: string;

    @IsOptional()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount?: string;

    @IsOptional()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency?: Currency;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
