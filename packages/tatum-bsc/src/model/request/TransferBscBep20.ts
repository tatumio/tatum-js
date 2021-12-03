import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength, Min, ValidateNested } from 'class-validator'
import { OneOf } from '@tatumio/tatum-core/dist/model/validation'
import { BSC_BASED_CURRENCIES, Currency } from '@tatumio/tatum-core/dist/model/request/Currency'
import { Fee } from '@tatumio/tatum-core/dist/model/request/Fee'
import { PrivateKeyOrSignatureId } from '@tatumio/tatum-core/dist/model/request/PrivateKeyOrSignatureId'

export class TransferBscBep20 extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(42, 42)
  public to: string

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  @OneOf(['currency', 'contractAddress'])
  public amount: string

  @MaxLength(130000)
  @IsOptional()
  public data?: string

  @IsIn(BSC_BASED_CURRENCIES)
  @IsOptional()
  public currency?: Currency

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee

  @Min(0)
  @IsOptional()
  public nonce?: number

  @Length(42, 42)
  @IsOptional()
  public contractAddress?: string
}
