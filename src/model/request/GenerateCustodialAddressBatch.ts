import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsNumber, IsOptional, Length, Max, Min} from 'class-validator';
import {Currency} from './Currency';
import {Fee} from './Fee';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class GenerateCustodialAddressBatch extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @IsIn([Currency.MATIC, Currency.CELO, Currency.BSC])
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
}
