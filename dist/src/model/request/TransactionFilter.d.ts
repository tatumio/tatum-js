import { OperationType } from '../response/ledger/OperationType';
import { TransactionType } from '../response/ledger/TransactionType';
export declare class TransactionFilter {
    id?: string;
    from?: number;
    to?: number;
    account?: string;
    counterAccount?: string;
    currency?: string;
    paymentId?: string;
    transactionCode?: string;
    senderNote?: string;
    recipientNote?: string;
    opType?: OperationType;
    transactionType?: TransactionType;
}
