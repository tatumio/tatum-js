import {Type} from 'class-transformer'
import {IsNumberString, IsOptional, Length, ValidateNested,} from 'class-validator'
import {Fee} from '../Fee'
import {PrivateKeyOrSignatureId} from '../PrivateKeyOrSignatureId'

export class EgldEsdtTransaction extends PrivateKeyOrSignatureId {
    @IsOptional()
    @Length(62, 62)
    public to?: string;

    @IsOptional()
    @Length(62, 62)
    public from?: string;

    @IsOptional()
    @IsNumberString()
    public amount?: string;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;

    // @IsOptional()
    // public nonce?: number;

    @IsOptional()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public data?: any;
}
