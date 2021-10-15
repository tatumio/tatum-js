import {IsArray, IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateIf} from 'class-validator'
import {Currency} from './Currency'
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId'

export class MintMultipleErc721 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @IsArray()
    public to: string[];

    @IsNotEmpty()
    @IsArray()
    public tokenId: string[];

    @IsNotEmpty()
    @IsArray()
    public url: string[];

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.TRON, Currency.ONE, Currency.MATIC])
    public chain: Currency;

    @IsNotEmpty()
    @Length(42, 43)
    public contractAddress: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsArray()
    @IsOptional()
    @ValidateIf(o => o.authorAddresses && o.cashbackValues)
    public authorAddresses?: string[][];

    @IsArray()
    @IsOptional()
    @ValidateIf(o => o.authorAddresses && o.cashbackValues)
    public cashbackValues?: string[][];

    @IsOptional()
    @IsArray()
    @ValidateIf(o => o.authorAddresses && o.cashbackValues && o.fixedValues)
    public fixedValues?:string[][];
}
