import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsUUID,
  Length,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { SignatureIdValidator } from '../validation/SignatureIdValidator'
import { Fee } from './Fee';

export class SmartContractMethodInvocation {

  @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.signatureId)
  @IsNotEmpty()
  @Validate(SignatureIdValidator)
  @Length(66, 66)
  public fromPrivateKey: string;

  @IsNotEmpty()
  @Length(42, 42)
  public contractAddress: string;

  @IsNotEmpty()
  public params: any[];

  @IsNotEmptyObject()
  public methodABI: any;

  @IsNotEmpty()
  @Length(1, 500)
  public methodName: string;

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.fromPrivateKey)
  @Length(36, 36)
  @IsUUID('4')
  @IsNotEmpty()
  @Validate(SignatureIdValidator)
  public signatureId?: string;
}
