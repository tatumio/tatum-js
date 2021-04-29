import { IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateIf } from 'class-validator';
import { Currency } from './Currency';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId';

export class MintMultipleErc721 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    public to: string[];

    @IsNotEmpty()
    public tokenId: string[];

    @IsNotEmpty()
    public url: string[];

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO])
    public chain: Currency;

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsNotEmpty()
    @ValidateIf(o => (o.authorAddresses && o.cashbackValues) || !o.cashbackValues)
    public authorAddresses?: string[][];

    @IsNotEmpty()
    @ValidateIf(o => (o.authorAddresses && o.cashbackValues) || !o.authorAddresses)
    public cashbackValues?: string[][];
}
