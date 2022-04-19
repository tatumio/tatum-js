import {get, post} from '../connector/tatum'
import {TransactionHash} from '../model'

/**
 * Broadcasts signed transaction to the Bnb blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BnbBroadcast" target="_blank">Tatum API documentation</a>
 */
export const bnbBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/bnb/broadcast`, {txData, signatureId})

/**
 * Returns account by address from Bnb blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BnbGetAccount" target="_blank">Tatum API documentation</a>
 */
export const bnbGetAccount = async (address: string): Promise<{ account_number: number, address: string, sequence: number }> => get(`/v3/bnb/account/${address}`)
