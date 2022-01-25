/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdaAccount = {
    summary?: {
        /**
         * Count of UTXOs transaction.
         */
        utxosCount?: number;
        assetBalances?: Array<{
            asset?: {
                /**
                 * Id of the asset.
                 */
                assetId?: string;
                /**
                 * Name of the asset.
                 */
                assetName?: string;
                /**
                 * Name of the asset.
                 */
                name?: string;
                /**
                 * Description of the asset.
                 */
                description?: string;
                /**
                 * Logo of the asset.
                 */
                logo?: string;
                /**
                 * Metadata hash of the asset.
                 */
                metadataHash?: string;
                /**
                 * Url of the asset.
                 */
                url?: string;
            };
            /**
             * Quantity of the asset.
             */
            quantity?: string;
        }>;
    };
}
