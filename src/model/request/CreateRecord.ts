import {Type} from 'class-transformer';
import {
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsUUID,
    Length,
    Min,
    Validate,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import {SignatureIdValidator} from '../validation/SignatureIdValidator';
import {Currency} from './Currency';
import {Fee} from './Fee';

export class CreateRecord {

    @ValidateIf(o => [Currency.ETH, Currency.QUORUM].includes(o.chain) && ((o.fromPrivateKey && o.signatureId) || !o.signatureId))
    @Validate(SignatureIdValidator)
    @IsNotEmpty()
    @Length(66, 66)
    public fromPrivateKey: string;

    @ValidateIf(o => [Currency.ETH, Currency.QUORUM].includes(o.chain) && ((o.fromPrivateKey && o.signatureId) || !o.fromPrivateKey))
    @Validate(SignatureIdValidator)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;

    @IsNotEmpty()
    @Length(1, 130000)
    public data: string;

    @IsNotEmpty()
    @IsIn([Currency.ETH, Currency.QUORUM, Currency.FABRIC])
    public chain: string;

    @IsNotEmpty()
    @ValidateIf(o => o.chain === Currency.QUORUM)
    @Length(42, 42)
    public from: string;

    @ValidateIf(o => o.chain === Currency.QUORUM)
    @Length(42, 42)
    public to?: string;

    @ValidateIf(o => o.chain === Currency.FABRIC)
    @IsNotEmpty()
    public key: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public ethFee?: Fee;
}
