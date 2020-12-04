/**
 *
 * @export
 * @interface VetEstimateGas
 */
export interface VetEstimateGas {
    /**
     * Sender
     * @type {string}
     * @memberof VetEstimateGas
     */
    from: string;
    /**
     * Recipient
     * @type {string}
     * @memberof VetEstimateGas
     */
    to: string;
    /**
     * Amount to send
     * @type {string}
     * @memberof VetEstimateGas
     */
    value: string;
    /**
     * Data to send to Smart Contract
     * @type {string}
     * @memberof VetEstimateGas
     */
    data: string;
    /**
     * Nonce
     * @type {number}
     * @memberof VetEstimateGas
     */
    nonce: number;
}
