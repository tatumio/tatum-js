import {Type} from 'class-transformer'
import {IsInt, IsNotEmpty, IsNumberString, IsOptional, Length, Min, ValidateNested, ValidateIf} from 'class-validator'
import {Fee} from './Fee'
import {Currency} from './Currency'
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId'

export class BurnErc20 extends PrivateKeyOrSignatureId {
    @IsNotEmpty()
    @IsNumberString()
    public amount: string;

    @IsNotEmpty()
    @Length(1, 43)
    public contractAddress: string;

    @Min(0)
    @IsInt()
    @IsOptional()
    public nonce?: number;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;

    @IsOptional()
    @Length(42, 58)
    public from?: string;
}
