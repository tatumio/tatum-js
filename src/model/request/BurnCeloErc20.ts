import {IsIn, IsInt, IsNotEmpty, IsNumberString, IsOptional, Length, Min,} from 'class-validator'
import {Currency} from './Currency'
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId'

export class BurnCeloErc20 extends PrivateKeyOrSignatureId {
    @IsNotEmpty()
    @IsNumberString()
    public amount: string;

    @IsNotEmpty()
    @Length(42, 43)
    public contractAddress: string;

    @Min(0)
    @IsInt()
    @IsOptional()
    public nonce?: number;

    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency: Currency;
}
