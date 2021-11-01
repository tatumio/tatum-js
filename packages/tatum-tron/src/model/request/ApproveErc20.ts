import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, Min, ValidateNested,} from 'class-validator';
import {Currency} from './Currency';
import {Fee} from './Fee';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class ApproveErc20 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(34, 43)
    public contractAddress: string;

    @IsNotEmpty()
    @IsIn([Currency.ETH, Currency.MATIC, Currency.BSC, Currency.ONE, Currency.CELO, Currency.TRON])
    public chain: Currency;

    @IsNotEmpty()
    @Length(34, 43)
    public spender: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

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
