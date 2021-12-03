import { Currency, getLogRecord as getLogRecordCore } from '@tatumio/tatum-core'

export const getLogRecord = async (id: string) => {
  return getLogRecordCore(Currency.EGLD, id)
}
