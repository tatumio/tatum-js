import { IsArray, IsIn, IsOptional } from 'class-validator'
import { TradeType, Trade } from '.'

export class HistoricalTrades extends Trade {
  @IsIn(Object.values(TradeType), { each: true })
  @IsArray()
  @IsOptional()
  public types?: TradeType[]
}
