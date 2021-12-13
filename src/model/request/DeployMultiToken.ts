import {IsIn, IsNotEmpty, IsOptional, Min, IsBoolean} from 'class-validator'
import {Currency} from './Currency'
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId'

export class DeployMultiToken extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    public uri: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC])
    public chain: Currency;

    @Min(0)
    @IsOptional()
    public nonce?: number;
    
    @IsBoolean()
    @IsOptional()
    public publicMint?: boolean;
}
