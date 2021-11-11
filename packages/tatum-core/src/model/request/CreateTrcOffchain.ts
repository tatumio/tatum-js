import { Type } from 'class-transformer'
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator'
import { Fiat } from '../response'
import { CreateErc20Validator } from './CreateErc20Validator'
import { Currency } from './Currency'
import { CustomerUpdate } from './CustomerUpdate'
import { TrcType } from './TrcType'

export class CreateTrcOffchain {
  @IsNotEmpty()
  @Length(1, 30)
  @Matches(/^[a-zA-Z0-9_]+$/)
  public symbol: string

  @IsNotEmpty()
  @Length(1, 100)
  public description: string

  @IsNotEmpty()
  @IsIn(Object.keys(TrcType))
  public type: TrcType

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(38)
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public supply: string

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public decimals: number

  @Length(3, 20)
  @IsIn([...Object.keys(Currency), ...Object.keys(Fiat)])
  @IsNotEmpty()
  public basePair: Currency | Fiat

  @Min(0)
  @IsOptional()
  public baseRate?: number

  @Length(3, 3)
  @IsOptional()
  public chain?: Currency

  @Length(3, 3)
  @IsOptional()
  @IsIn(Object.keys(Fiat))
  public accountingCurrency?: Fiat

  @ValidateIf((o) => (o.xpub && o.address) || !o.address)
  @Validate(CreateErc20Validator)
  @Length(130, 130)
  @IsNotEmpty()
  public xpub: string

  @ValidateIf((o) => (o.xpub && o.address) || !o.xpub)
  @Validate(CreateErc20Validator)
  @Length(34, 34)
  @IsNotEmpty()
  public address: string

  @ValidateIf((o) => (o.xpub && o.address) || !o.address)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  public derivationIndex: number

  @IsOptional()
  @Type(() => CustomerUpdate)
  @ValidateNested()
  public customer?: CustomerUpdate
}
