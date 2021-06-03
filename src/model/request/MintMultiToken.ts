import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsOptional, Length, MaxLength, Min, ValidateIf, ValidateNested} from 'class-validator';
import { Currency } from './Currency';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId';
import { Fee } from './Fee'

export class MintMultiToken extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 42)
    public to: string;

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

    @IsOptional()
    public data: string;

    @IsNotEmpty()
    public amount: string;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;

}