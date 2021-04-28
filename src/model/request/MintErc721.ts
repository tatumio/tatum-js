import { IsIn, IsNotEmpty, IsOptional, Length, MaxLength, Min, ValidateIf } from 'class-validator';
import { Currency } from './Currency';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId';

export class MintErc721 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 42)
    public to: string;

    @IsNotEmpty()
    @MaxLength(256)
    public url: string;

    @IsNotEmpty()
    @MaxLength(256)
    public tokenId: string;

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
    public authorAddresses?: string[];

    @IsNotEmpty()
    @ValidateIf(o => (o.authorAddresses && o.cashbackValues) || !o.authorAddresses)
    public cashbackValues?: string[];

}
