import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumberString, IsOptional, Length, Matches, Max, MaxLength, Min, ValidateNested } from 'class-validator'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class DeployErc20 extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(1, 100)
  @Matches(/^[a-zA-Z0-9_]+$/)
  public name: string

  @IsNotEmpty()
  @Length(1, 30)
  public symbol: string

  @IsNotEmpty()
  @Length(42, 43)
  public address: string

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(38)
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public supply: string

  @IsOptional()
  @IsNumberString()
  @MaxLength(38)
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public totalCap?: string

  @Min(1)
  @Max(30)
  public digits: number

  @IsOptional()
  @Min(0)
  public nonce?: number

  @IsOptional()
  @ValidateNested()
  @Type(() => Fee)
  public fee?: Fee

  @IsOptional()
  public url?: string;
}
