// @TODO remove after OPENAPI change

import { OrderBookService } from '@tatumio/api-client'

export class AbstractSdkLedgerOrderBookService {
  getHistoricalTrades = OrderBookService.getHistoricalTradesBody
  getActiveBuyTrades = OrderBookService.getBuyTradesBody
  getActiveSellTrades = OrderBookService.getBuyTradesBody
  storeTrade = OrderBookService.storeTrade
  getTradeById = OrderBookService.getTradeById
  deleteTrade = OrderBookService.deleteTrade
  deleteAccountTrades = OrderBookService.deleteAccountTrades
}
