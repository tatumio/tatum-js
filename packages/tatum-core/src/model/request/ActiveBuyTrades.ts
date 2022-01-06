import { IsIn, IsOptional } from 'class-validator'
import { BuyTradeType, Trade } from '.'

export class ActiveBuyTrades extends Trade {
  @IsIn(Object.values(BuyTradeType))
  @IsOptional()
  public tradeType?: BuyTradeType
}
