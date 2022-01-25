/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Erc20Response = {
    /**
     * Account ID with the type of currency as created ERC20/BEP20 token symbol. Supply of ERC20/BEP20 token will be credited as soon as ERC20/BEP20 token is deployed to the Ethereum blockchain.
     */
    accountId?: string;
    /**
     * Initial address of new created ERC20/BEP20 token. On this address, all tokens will be minted.
     */
    address?: string;
}
