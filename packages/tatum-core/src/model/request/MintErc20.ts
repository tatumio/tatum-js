import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumberString, IsOptional, Length, Min, ValidateNested } from 'class-validator'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class MintErc20 extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(42, 43)
  public to: string

  @IsNotEmpty()
  @IsNumberString()
  public amount: string

  @IsNotEmpty()
  @Length(42, 43)
  public contractAddress: string

  @Min(0)
  @IsOptional()
  public nonce?: number

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
