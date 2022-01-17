/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SolanaTx = {
    blockTime?: number;
    meta?: {
        err?: string;
        fee?: number;
        innerInstructions?: Array<any>;
        logMessages?: Array<string>;
        postBalances?: Array<number>;
        postTokenBalances?: Array<number>;
        preBalances?: Array<number>;
        preTokenBalances?: Array<number>;
        rewards?: Array<any>;
        status?: {
            Ok?: string;
        };
    };
    slot?: number;
    transaction?: {
        message?: {
            header?: {
                numReadonlySignedAccounts?: number;
                numReadonlyUnsignedAccounts?: number;
                numRequiredSignatures?: number;
            };
            accountKeys?: Array<{
                _bn?: string;
            }>;
            recentBlockhash?: string;
            instructions?: Array<{
                accounts?: Array<number>;
                data?: string;
                programIdIndex?: number;
            }>;
            indexToProgramIds?: any;
        };
        signatures?: Array<string>;
    };
}
