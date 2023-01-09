/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferBtcMnemonic = {
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Blockchain address to send assets to. For BTC, LTC, DOGE and BCH, it is possible to enter list of multiple recipient blockchain addresses as a comma separated string.
     */
    address: string;
    /**
     * Amount to be withdrawn to blockchain.
     */
    amount: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * Fee to be submitted as a transaction fee to blockchain. If none is set, default value of 0.0005 BTC is used. Minimum fee is 0.00001 BTC.
     */
    fee?: string;
    /**
     * For BTC, LTC, DOGE and BCH, it is possible to enter list of multiple recipient blockchain amounts. List of recipient addresses must be present in the address field and total sum of amounts must be equal to the amount field.
     */
    multipleAmounts?: Array<string>;
    /**
     * Mnemonic seed - usually 12-24 words with access to whole wallet.
     * Either mnemonic, keyPair or signature Id must be present - depends on the type of account and xpub.
     * Tatum KMS does not support keyPair type of off-chain transaction, only mnemonic based.
     *
     */
    mnemonic: string;
    /**
     * Extended public key (xpub) of the wallet associated with the accounts and used mnemonic. Should be present, when mnemonic is used.
     */
    xpub: string;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Note visible to owner of withdrawing account
     */
    senderNote?: string;
}
