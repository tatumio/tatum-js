/**
 *
 * @export
 * @interface Account
 */
import {AccountBalance} from './AccountBalance';

export interface Account {
    /**
     * For bookkeeping to distinct account purpose.
     * @type {string}
     * @memberof Account
     */
    accountCode?: string;
    /**
     * Account ID.
     * @type {string}
     * @memberof Account
     */
    id: string;
    /**
     *
     * @type {AccountBalance}
     * @memberof Account
     */
    balance: AccountBalance;
    /**
     * Time of account creation.
     * @type {string}
     * @memberof Account
     */
    created: string;
    /**
     * Account currency. Supported values are BTC, LTC, BCH, ETH, XRP, Tatum Virtual Currencies started with VC_ prefix or ERC20 customer token created via Tatum Platform.
     * @type {string}
     * @memberof Account
     */
    currency: string;
    /**
     * ID of newly created customer or existing customer associated with account.
     * @type {string}
     * @memberof Account
     */
    customerId?: string;
    /**
     * Indicates whether account is frozen or not.
     * @type {boolean}
     * @memberof Account
     */
    frozen: boolean;
    /**
     * Indicates whether account is active or not.
     * @type {boolean}
     * @memberof Account
     */
    active: boolean;
    /**
     * Extended public key to derive address from.
     * In case of XRP, this is account address, since address is defined as DestinationTag, which is address field.
     * In case of XLM, this is account address, since address is defined as message, which is address field.
     * @type {string}
     * @memberof Account
     */
    xpub?: string;
}