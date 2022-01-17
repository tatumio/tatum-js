/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SolanaBlock = {
    blockHeight?: number;
    blockTime?: number;
    blockhash?: string;
    parentSlot?: number;
    previousBlockhash?: string;
    rewards?: Array<{
        commission?: string;
        lamports?: number;
        postBalance?: number;
        pubkey?: string;
        rewardType?: string;
    }>;
    transactions?: Array<{
        meta?: {
            err?: string;
            fee?: number;
            innerInstructions?: Array<any>;
            logMessages?: Array<string>;
            postBalances?: Array<number>;
            postTokenBalances?: Array<number>;
            preBalances?: Array<number>;
            preTokenBalances?: Array<number>;
        };
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
    }>;
}
