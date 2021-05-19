import {
    IsIn,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    Length,
    Min,
} from 'class-validator';
import {Currency} from './Currency';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class MintErc20 extends PrivateKeyOrSignatureId {
    @IsNotEmpty()
    @Length(42, 43)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    public amount: string;

    @IsNotEmpty()
    @Length(42, 43)
    public contractAddress: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
