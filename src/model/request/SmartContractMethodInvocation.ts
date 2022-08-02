import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsOptional,
  IsUUID,
  Length,
  Matches,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator'
import { Fee } from './Fee'
import { SignatureIdValidator } from '../validation/SignatureIdValidator'

export class SmartContractMethodInvocation {

  @IsNotEmpty()
  @Length(42, 43)
  public contractAddress: string;

  @IsNotEmpty()
  public params: any[];

  @IsNotEmptyObject()
  public methodABI: any;

  @IsNotEmpty()
  @Length(1, 500)
  public methodName: string;

  @IsOptional()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public amount?: string;

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  @ValidateIf(o => !o.caller)
  @Validate(SignatureIdValidator)
  @IsOptional()
  @Length(64, 103)
  public fromPrivateKey?: string;

  @ValidateIf(o => !o.fromPrivateKey && !o.signatureId)
  @IsNotEmpty()
  @Length(42, 43)
  public caller?: string

  @ValidateIf(o => !o.caller)
  @Validate(SignatureIdValidator)
  @Length(36, 36)
  @IsUUID('4')
  @IsOptional()
  public signatureId?: string;

  @ValidateIf(o => o.signatureId)
  @IsOptional()
  @Min(0)
  public index?: number;
}
