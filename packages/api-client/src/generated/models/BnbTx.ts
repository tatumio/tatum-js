/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BnbTx = {
    code?: number;
    hash?: string;
    height?: string;
    log?: string;
    ok?: boolean;
    tx?: {
        type?: string;
        value?: {
            memo?: string;
            msg?: Array<{
                type?: string;
                value?: {
                    /**
                     * List of transactions, from which assets are being sent.
                     */
                    inputs?: Array<{
                        address?: string;
                        coins?: Array<{
                            amount?: string;
                            denom?: string;
                        }>;
                    }>;
                    /**
                     * List of recipient addresses and amounts to send to each of them.
                     */
                    outputs?: Array<{
                        address?: string;
                        coins?: Array<{
                            amount?: string;
                            denom?: string;
                        }>;
                    }>;
                };
            }>;
            signatures?: Array<{
                account_number?: string;
                pub_key?: {
                    type?: string;
                    value?: string;
                };
                sequence?: string;
                signature?: string;
            }>;
            source?: string;
        };
    };
}
