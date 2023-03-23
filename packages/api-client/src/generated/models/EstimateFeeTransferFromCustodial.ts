/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFeeTransferFromCustodial = {
    /**
     * The blockchain to estimate the fee for
     */
    chain: 'CELO' | 'ETH' | 'BSC' | 'XDC' | 'KLAY' | 'ONE' | 'MATIC';
    /**
     * The type of the transaction
     */
    type: 'TRANSFER_CUSTODIAL';
    /**
     * The blockchain address of the sender
     */
    sender: string;
    /**
     * The blockchain address of the recipient
     */
    recipient: string;
    /**
     * Contract address of the token
     */
    contractAddress?: string;
    /**
     * The blockchain address of the custodial wallet contract
     */
    custodialAddress: string;
    /**
     * The type of the asset to transfer. Set <code>0</code> for fungible tokens (ERC-20 or equivalent), <code>1</code> for NFTs (ERC-721 or equivalent), <code>2</code> for Multi Tokens (ERC-1155 or equivalent), or <code>3</code> for native blockchain currencies.
     */
    tokenType: 0 | 1 | 2 | 3;
    /**
     * <ul><li>If the asset to transfer is a fungible token, Multi Token, or a native blockchain currency, set this parameter to the amount to transfer.</li>
     * <li>If the asset to transfer is an NFT, set this parameter to <code>1</code>.</li></ul>
     *
     */
    amount: string;
    /**
     * (only if tokenType = 1 or 2) Token id
     */
    tokenId?: string;
}
