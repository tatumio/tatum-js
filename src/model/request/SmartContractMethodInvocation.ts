import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  Length,
  Min,
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
  @ValidateNested()
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
