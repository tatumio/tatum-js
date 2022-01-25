// @TODO remove after OPENAPI change

import { LedgerOrderBookService } from '@tatumio/api-client'

export class AbstractSdkLedgerOrderBookService {
  getHistoricalTrades = LedgerOrderBookService.getHistoricalTradesBody
  getActiveBuyTrades = LedgerOrderBookService.getBuyTradesBody
  getActiveSellTrades = LedgerOrderBookService.getBuyTradesBody
  storeTrade = LedgerOrderBookService.storeTrade
  getTradeById = LedgerOrderBookService.getTradeById
  deleteTrade = LedgerOrderBookService.deleteTrade
  deleteAccountTrades = LedgerOrderBookService.deleteAccountTrades
}
