import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Currency } from './Currency';
import { Fee } from './Fee';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class CreateRecord extends PrivateKeyOrSignatureId {

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
