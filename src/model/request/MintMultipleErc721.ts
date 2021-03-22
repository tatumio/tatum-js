import {IsIn, IsNotEmpty, IsOptional, Length, Min} from 'class-validator';
import {Currency} from './Currency';
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId';

export class MintMultipleErc721 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    public to: string[];

    @IsNotEmpty()
    public tokenId: string[];

    @IsNotEmpty()
    public url: string[];

    @IsNotEmpty()
    @IsIn([Currency.BSC, Currency.ETH, Currency.CELO])
    public chain: Currency;

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
