import { Type } from 'class-transformer';
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
} from 'class-validator';
import { ARB_BASED_CURRENCIES, BASE_BASED_CURRENCIES, BSC_BASED_CURRENCIES, Currency, ETH_BASED_CURRENCIES, MATIC_BASED_CURRENCIES, OPTIMISM_BASED_CURRENCIES } from './Currency';
import { Fee } from './Fee';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId';
import { OneOf } from '../validation/OneOf'

export class TransferErc20 extends PrivateKeyOrSignatureId {

  @IsNotEmpty()
  @Length(42, 58)
  public to: string;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  @OneOf(['currency', 'contractAddress'])
  public amount: string;

  @MaxLength(130000)
  @IsOptional()
  public data?: string;

  @IsOptional()
  @IsIn([...ETH_BASED_CURRENCIES, ...MATIC_BASED_CURRENCIES, Currency.XDC, Currency.KLAY, Currency.ONE, ...BSC_BASED_CURRENCIES, Currency.ALGO, ...ARB_BASED_CURRENCIES, ...BASE_BASED_CURRENCIES, ...OPTIMISM_BASED_CURRENCIES])
  public currency?: Currency;

  @OneOf(['currency', 'contractAddress'])
  @IsOptional()
  @Length(1, 43)
  public contractAddress?: string;

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;

  @ValidateIf(o => !o.currency)
  @Min(1)
  @Max(30)
  public digits?: number;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  @IsOptional()
  @Length(42, 58)
  public from?: string;
}
