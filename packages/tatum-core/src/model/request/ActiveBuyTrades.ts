import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator'
import { AmountFilter, BuyTradeType, OrderBookSort } from '.'

export class ActiveBuyTrades {
  @IsString()
  @IsOptional()
  public id?: string

  @IsString()
  @IsOptional()
  public customerId?: string

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(50)
  public pageSize: number

  @IsNumber()
  @IsOptional()
  public offset?: number

  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/)
  @Length(3, 30)
  public pair?: string

  @IsBoolean()
  @IsOptional()
  public count?: boolean

  @IsIn(Object.values(BuyTradeType))
  @IsOptional()
  public tradeType?: BuyTradeType

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AmountFilter)
  public amount?: AmountFilter[]

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AmountFilter)
  public fill?: AmountFilter[]

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AmountFilter)
  public price?: AmountFilter[]

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AmountFilter)
  public created?: AmountFilter[]

  @IsIn(Object.values(OrderBookSort), { each: true })
  @IsArray()
  @IsOptional()
  public sort?: OrderBookSort[]
}
