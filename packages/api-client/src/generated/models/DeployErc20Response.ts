/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployErc20Response = {
    /**
     * Account ID with the type of currency as created ERC20/BEP20 token symbol. Account will be unfrozen when ERC20/BEP20 contract address will be set.
     */
    accountId: string;
    /**
     * TX hash of successful transaction. From this transaction receipt contract address can be obtained.
     */
    txId: string;
}
