/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployErc20SignatureResponse = {
    /**
     * Account ID with the type of currency as created ERC20/BEP20 token symbol. Account will be unfrozen when ERC20/BEP20 contract address will be set.
     */
    accountId: string;
    /**
     * ID of prepared payment template to sign. This is should be stored on a client side to retrieve ID of the blockchain transaction, when signing application signs the transaction and broadcasts it to the blockchain.
     */
    signatureId: string;
}
