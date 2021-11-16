import { PrivateKeyOrSignatureId, Currency, Fee, OneOf } from '@tatumio/tatum-core'
import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength, Min, ValidateNested } from 'class-validator'

export class TransferCeloOrCeloErc20Token extends PrivateKeyOrSignatureId {
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

  @IsOptional()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public currency?: Currency

  @IsOptional()
  @Length(42, 42)
  @OneOf(['currency', 'contractAddress'])
  public contractAddress?: string

  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency

  @Min(0)
  @IsOptional()
  public nonce?: number

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
