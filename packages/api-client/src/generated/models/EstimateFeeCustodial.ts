/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFeeCustodial = {
    /**
     * Blockchain to estimate fee for.
     */
    chain: EstimateFeeCustodial.chain;
    /**
     * Type of transaction
     */
    type: EstimateFeeCustodial.type;
    /**
     * Sender address
     */
    sender: string;
    /**
     * Blockchain address to send assets
     */
    recipient: string;
    /**
     * Contract address of the token
     */
    contractAddress: string;
    /**
     * Contract address of custodial wallet contract
     */
    custodialAddress: string;
    /**
     * Amount to be sent in native asset, ERC20 or ERC1155
     */
    amount: string;
    /**
     * Type of the token to transfer from custodial wallet. 0 - ERC20, 1 - ERC721, 2 - ERC1155, 3 - native asset
     */
    tokenType: number;
}

export namespace EstimateFeeCustodial {

    /**
     * Blockchain to estimate fee for.
     */
    export enum chain {
        CELO = 'CELO',
        ETH = 'ETH',
        BSC = 'BSC',
        XDC = 'XDC',
        ONE = 'ONE',
        MATIC = 'MATIC',
    }

    /**
     * Type of transaction
     */
    export enum type {
        TRANSFER_CUSTODIAL = 'TRANSFER_CUSTODIAL',
    }


}
