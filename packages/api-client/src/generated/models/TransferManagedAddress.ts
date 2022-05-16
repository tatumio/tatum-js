/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferManagedAddress = {
    /**
     * Blockchain to work on
     */
    chain: 'SOL';
    /**
     * Hex serialized data representing transaction, which should be signed using one of the managed wallets.
     */
    txData: string;
    walletIds: Array<{
        /**
         * Wallet ID of wallet, which should be used for signing. In case of RAW type of the wallet, this represents the private key which will be used for signatures.
         */
        key: string;
        /**
         * Type of the wallet to be used - RAW represents native private key, MANAGED represents ID of the managed wallet.
         */
        type: 'MANAGED' | 'RAW';
    }>;
}
