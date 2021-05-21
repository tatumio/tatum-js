import {IsIn, IsNotEmpty, IsOptional, Length, Min} from 'class-validator';
import {Currency} from './Currency';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class DeployMultiToken extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    public uri: string;

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO])
    public chain: Currency;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
