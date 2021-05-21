import { Type } from 'class-transformer'
import { Fee } from './Fee'
import {IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateNested} from 'class-validator';
import {Currency} from './Currency';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class MintMultiTokenBatch extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    public to: string[];

    @IsNotEmpty()
    public tokenId: string[][];

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
    public amounts: string[][];

    @IsNotEmpty()
    public data: string;

    public authorAddresses?: string[][][];

    public cashbackValues?: string[][][];
    
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}
