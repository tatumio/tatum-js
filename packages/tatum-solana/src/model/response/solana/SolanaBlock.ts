import {SolanaTx} from "./SolanaTx";

export interface SolanaBlock {
    blockhash: string;
    previousBlockhash: string;
    parentSlot: number;
    transactions: {
        transaction: SolanaTx;
        meta:{
            fee: number;
            preBalances: number[];
            postBalances: number[];
            innerInstructions?: [];
            preTokenBalances?: [];
            postTokenBalances?: [];
            logMessages: string[];
        }
    }[];
    blockTime?: number;
    blockHeight?: number;
}
