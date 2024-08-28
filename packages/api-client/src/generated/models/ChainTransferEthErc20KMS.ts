/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type ChainTransferEthErc20KMS = {
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'BSC' | 'MATIC' | 'KLAY' | 'XDC' | 'ONE';
    /**
     * The blockchain address to send the fungible tokens to
     */
    to: string;
    /**
     * The blockchain address of the fungible token smart contract
     */
    contractAddress: string;
    /**
     * The amount of the fungible tokens to be sent
     */
    amount: string;
    /**
     * The number of decimal places that the fungible tokens have; to find out how many decimal places are used in the fungible tokens, check out the <a href="https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress" target="_blank">smart contract</a>
     */
    digits: number;
    /**
     * The KMS identifier of the private key of the blockchain address from which the fee will be deducted
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the address from which the fee will be deducted that was generated from the mnemonic
     */
    index?: number;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
