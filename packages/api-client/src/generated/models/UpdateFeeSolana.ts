/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateFeeSolana = {
    /**
     * The blockchain to work with
     */
    chain: 'SOL';
    /**
     * The blockchain address of the marketplace smart contract
     */
    contractAddress: string;
    /**
     * The new percentage of the amount that an NFT was sold for that will be sent to the marketplace as a fee. To set the fee to 1%, set this parameter to <code>100</code>; to set 10%, set this parameter to <code>1000</code>; to set 50%, set this parameter to <code>5000</code>, and so on.
     */
    marketplaceFee: number;
    /**
     * The blockchain address of the marketplace authority
     */
    from: string;
    /**
     * The private key of the marketspace authority
     */
    fromPrivateKey: string;
}
