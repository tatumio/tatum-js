import { Type } from 'class-transformer'
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
} from 'class-validator'
import { SignatureIdValidator } from '../validation'
import { Currency } from './Currency'
import { Fee } from './Fee'

export class CreateRecord {
  @ValidateIf((o) => o.chain === Currency.ETH && ((o.fromPrivateKey && o.signatureId) || !o.signatureId))
  @Validate(SignatureIdValidator)
  @IsNotEmpty()
  @Length(66, 66)
  public fromPrivateKey: string

  @ValidateIf((o) => o.chain === Currency.ETH && ((o.fromPrivateKey && o.signatureId) || !o.fromPrivateKey))
  @Validate(SignatureIdValidator)
  @Length(36, 36)
  @IsUUID('4')
  @IsNotEmpty()
  public signatureId?: string

  @IsNotEmpty()
  @Length(1, 130000)
  public data: string

  @IsNotEmpty()
  @IsIn([
    Currency.ETH,
    Currency.BSC,
    Currency.CELO,
    Currency.MATIC,
    Currency.XDC,
    Currency.ONE,
    Currency.KLAY,
    Currency.EGLD,
    Currency.KCS,
    Currency.GLMR,
  ])
  public chain: string

  @ValidateIf((o) => o.chain === Currency.CELO)
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency?: Currency

  @IsNotEmpty()
  @ValidateIf((o) => o.chain === Currency.EGLD)
  @Length(42, 43)
  public from: string

  @ValidateIf((o) => o.signatureId)
  @Length(42, 43)
  public to?: string

  @Min(0)
  @IsOptional()
  public nonce?: number

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public ethFee?: Fee

  @ValidateIf((o) => o.chain === Currency.ONE)
  @IsOptional()
  @Min(0)
  public fromShardID?: number

  @ValidateIf((o) => o.chain === Currency.ONE)
  @IsOptional()
  @Min(0)
  public toShardID?: number
}
