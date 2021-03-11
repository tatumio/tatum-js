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
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class SmartContractMethodInvocation extends PrivateKeyOrSignatureId {

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
}
