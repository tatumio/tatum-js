/**
 *
 * @export
 * @interface Blockage
 */
export interface Blockage {
    /**
     * ID of the blockage.
     * @type {string}
     * @memberof Blockage
     */
    id: string;
    /**
     * ID of the account this blockage is for.
     * @type {string}
     * @memberof Blockage
     */
    accountId: string;
    /**
     * Amount blocked on account.
     * @type {string}
     * @memberof Blockage
     */
    amount: string;
    /**
     * Type of blockage.
     * @type {string}
     * @memberof Blockage
     */
    type: string;
    /**
     * Description of blockage.
     * @type {string}
     * @memberof Blockage
     */
    description?: string;
}
