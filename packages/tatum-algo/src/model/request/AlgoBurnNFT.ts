import { PrivateKeyOrSignatureId, Currency } from '@tatum/tatum-core';
import { IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, IsIn} from 'class-validator';

export class AlgoBurnNFT extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @IsIn([Currency.ALGO])
    public chain: Currency;

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsOptional()
    @MaxLength(30)
    public note: string;

    @IsNotEmpty()
    @IsNumberString()
    public contractAddress: string;
}