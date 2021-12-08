import { Currency, getLogRecord as getLogRecordCore } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetLog" target="_blank">Tatum API documentation</a>
 */
export const getLogRecord = async (id: string) => {
  return getLogRecordCore(Currency.ONE, id)
}
