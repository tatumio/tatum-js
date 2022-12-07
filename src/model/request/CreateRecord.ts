import { Type } from 'class-transformer';
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
import { SignatureIdValidator } from '../validation/SignatureIdValidator';
import { Currency } from './Currency';
import { Fee } from './Fee';

export class CreateRecord {
  @IsNotEmpty()
  @Length(64, 103)
  public fromPrivateKey: string;

  @ValidateIf(o => o.chain === Currency.ETH && ((o.fromPrivateKey && o.signatureId) || !o.fromPrivateKey))
  @Validate(SignatureIdValidator)
  @Length(36, 36)
  @IsUUID('4')
  @IsNotEmpty()
  public signatureId?: string;

  @IsNotEmpty()
  @Length(1, 130000)
  public data: string;

  @IsNotEmpty()
  @IsIn([Currency.ETH, Currency.BSC, Currency.CELO, Currency.MATIC, Currency.KLAY, Currency.ONE, Currency.EGLD])
  public chain: string;

  @ValidateIf(o => o.chain === Currency.CELO)
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency?: Currency;

  @ValidateIf(o => o.chain === Currency.EGLD)
  @IsNotEmpty()
  @Length(42, 62)
  public from: string;

  @ValidateIf(o => o.signatureId)
  @Length(42, 62)
  public to?: string;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public ethFee?: Fee;

  @ValidateIf(o => o.chain === Currency.ONE)
  @IsOptional()
  @Min(0)
  public fromShardID?: number;

  @ValidateIf(o => o.chain === Currency.ONE)
  @IsOptional()
  @Min(0)
  public toShardID?: number;
}
