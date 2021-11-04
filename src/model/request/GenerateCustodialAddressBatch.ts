import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsNumber, IsOptional, Length, Max, Min, ValidateIf} from 'class-validator';
import {Currency} from './Currency';
import {Fee} from './Fee';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class GenerateCustodialAddressBatch extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @IsIn([Currency.MATIC, Currency.CELO, Currency.BSC, Currency.ETH, Currency.TRON])
    public chain: Currency;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(270)
    public batchCount: number;

    @IsNotEmpty()
    @Length(34, 43)
    public owner: string;

    @IsOptional()
    @Min(0)
    public nonce?: number;

    @IsOptional()
    @Type(() => Fee)
    public fee?: Fee;

    @IsOptional()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency?: Currency;

    @ValidateIf(o => o.signatureId && o.chain === Currency.TRON)
    @IsNotEmpty()
    @Length(34, 34)
    public from?: string;

    @ValidateIf(o => o.chain === Currency.TRON)
    @IsNotEmpty()
    @Min(0)
    public feeLimit?: number;
}
