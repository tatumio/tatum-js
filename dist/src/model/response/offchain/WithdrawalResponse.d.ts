/**
 *
 * @export
 * @interface WithdrawalResponse
 */
import { Address } from './Address';
export interface WithdrawalResponse {
    /**
     * Transaction reference of the transaction connected to this withdrawal.
     * @type {string}
     * @memberof WithdrawalResponse
     */
    reference: string;
    /**
     *
     * @type {Array<WithdrawalResponseData>}
     * @memberof WithdrawalResponse
     */
    data: WithdrawalResponseData[];
    /**
     * ID of withdrawal
     * @type {string}
     * @memberof WithdrawalResponse
     */
    id: string;
}
/**
 *
 * @export
 * @interface WithdrawalResponseData
 */
export interface WithdrawalResponseData {
    /**
     *
     * @type {Address}
     * @memberof WithdrawalResponseData
     */
    address: Address;
    /**
     * Amount of unprocessed transaction outputs, that can be used for withdrawal. Bitcoin, Litecoin, Bitcoin Cash only.
     * @type {number}
     * @memberof WithdrawalResponseData
     */
    amount: number;
    /**
     * Last used unprocessed transaction output, that can be used.
     * Bitcoin, Litecoin, Bitcoin Cash only. If -1, it indicates prepared vOut with amount to be transferred to pool address.
     * @type {string}
     * @memberof WithdrawalResponseData
     */
    vIn: string;
    /**
     * Index of last used unprocessed transaction output in raw transaction, that can be used. Bitcoin, Litecoin, Bitcoin Cash only.
     * @type {number}
     * @memberof WithdrawalResponseData
     */
    vInIndex: number;
    /**
     * Script of last unprocessed UTXO. Bitcoin SV only.
     * @type {string}
     * @memberof WithdrawalResponseData
     */
    scriptPubKey: string;
}
