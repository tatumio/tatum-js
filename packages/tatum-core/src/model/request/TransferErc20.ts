import { Type } from 'class-transformer'
import {
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator'
import { Currency, ETH_BASED_CURRENCIES, MATIC_BASED_CURRENCIES } from './Currency'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'
import { OneOf } from '../validation/OneOf'

export class TransferErc20 extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(42, 58)
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
  @IsIn([...ETH_BASED_CURRENCIES, ...MATIC_BASED_CURRENCIES, Currency.XDC, Currency.ONE, Currency.ALGO, Currency.KCS, Currency.GLMR])
  public currency?: Currency

  @ValidateIf((o) => !o.currency)
  @IsNotEmpty()
  @Length(1, 43)
  public contractAddress?: string

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee

  @ValidateIf((o) => !o.currency)
  @Min(1)
  @Max(30)
  public digits?: number

  @Min(0)
  @IsOptional()
  public nonce?: number

  @IsOptional()
  @Length(42, 58)
  public from?: string
}
