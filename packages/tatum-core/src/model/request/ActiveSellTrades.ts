import { IsIn, IsOptional } from 'class-validator'
import { SellTradeType, Trade } from '.'

export class ActiveSellTrades extends Trade {
  @IsIn(Object.values(SellTradeType))
  @IsOptional()
  public tradeType?: SellTradeType
}
