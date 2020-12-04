import { Currency } from '../../request';
import { WithdrawalResponseData } from '../offchain/WithdrawalResponse';
export declare class TransactionKMS {
    id: string;
    chain: Currency;
    serializedTransaction: string;
    hashes: string[];
    txId?: string;
    withdrawalId?: string;
    index?: number;
    withdrawalResponses?: WithdrawalResponseData[];
}
