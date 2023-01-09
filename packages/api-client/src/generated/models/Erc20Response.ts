/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Erc20Response = {
    /**
     * The ID of the created virtual account with the currency set to the token name (the <code>symbol</code> parameter of the request body)<br/>The token supply will be created as soon as the token smart contract is deployed on the blockchain.
     */
    accountId?: string;
    /**
     * The deposit address of the virtual account
     */
    address?: string;
}
