import {get} from '../connector/tatum'
import {Currency} from '../model'

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/GetLog" target="_blank">Tatum API documentation</a>
 */
export const getLogRecord = async (chain: Currency, id: string): Promise<{ data: string }> => get(`/v3/record?chain=${chain}&id=${id}`)
