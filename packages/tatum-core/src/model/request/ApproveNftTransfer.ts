import {Type} from 'class-transformer';
import {IsBoolean, IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, Min, ValidateIf, ValidateNested,} from 'class-validator';
import {Currency} from './Currency';
import {Fee} from './Fee';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class ApproveNftTransfer extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(34, 43)
    public contractAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.ETH, Currency.MATIC, Currency.BSC, Currency.ONE, Currency.CELO])
    public chain: Currency;

    @IsNotEmpty()
    @Length(34, 43)
    public spender: string;

    @IsNotEmpty()
    @IsBoolean()
    public isErc721: boolean;

    @ValidateIf(o => o.isErc721)
    @IsNotEmpty()
    @IsNumberString()
    public tokenId: string;

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
