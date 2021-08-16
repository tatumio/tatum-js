import {Type} from 'class-transformer'
import {IsNotEmpty, IsNotEmptyObject, IsNumberString, IsOptional, Length, Matches, Min, ValidateNested,} from 'class-validator'
import {Fee} from './Fee'
import {PrivateKeyOrSignatureId} from './PrivateKeyOrSignatureId'

export class SmartContractMethodInvocation extends PrivateKeyOrSignatureId {

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
}
