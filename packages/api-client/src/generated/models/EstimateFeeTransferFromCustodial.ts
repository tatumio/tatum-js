/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFeeTransferFromCustodial = {
    /**
     * Blockchain to estimate fee for.
     */
    chain: 'CELO' | 'ETH' | 'BSC' | 'XDC' | 'KLAY' | 'ONE' | 'MATIC';
    /**
     * Type of transaction
     */
    type: 'TRANSFER_CUSTODIAL';
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
     * Type of the token to transfer from gas pump wallet. 0 - ERC20, 1 - ERC721, 2 - ERC1155, 3 - native asset
     */
    tokenType: number;
}
