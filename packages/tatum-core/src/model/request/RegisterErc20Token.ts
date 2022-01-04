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
  ValidateNested,
} from 'class-validator'
import { Fiat } from '../response'
import { Currency } from './Currency'
import { CustomerUpdate } from './CustomerUpdate'

export class RegisterErc20Token {
  @IsNotEmpty()
  @Length(1, 30)
  @Matches(/^[a-zA-Z0-9_]+$/)
  public symbol: string

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(38)
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public supply: string

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public decimals: number

  @IsNotEmpty()
  @Length(1, 100)
  public description: string

  @Length(3, 50)
  @IsIn([...Object.keys(Currency), ...Object.keys(Fiat)])
  @IsNotEmpty()
  public basePair: Currency | Fiat

  @Min(0)
  @IsOptional()
  public baseRate?: number

  @IsOptional()
  @Type(() => CustomerUpdate)
  @ValidateNested()
  public customer?: CustomerUpdate

  @Length(3, 3)
  @IsOptional()
  @IsIn(Object.keys(Fiat))
  public accountingCurrency?: Fiat

  @Length(1, 150)
  @IsNotEmpty()
  public xpub: string

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  public derivationIndex: number
}
