import { SubscriptionType } from '../response/ledger/SubscriptionType';
export declare class SubscriptionAttrAccountBalanceLimit {
    limit: string;
    typeOfBalance: string;
}
export declare class SubscriptionAttrOffchainWithdrawal {
    currency: string;
}
export declare class SubscriptionAttrTxHistoryReport {
    interval: number;
}
export declare class SubscriptionAttrIncomingBlockchainTx {
    id: string;
    url: string;
}
export declare class SubscriptionAttrCompleteBlockchainTx {
    currency: string;
}
export declare class CreateSubscription {
    type: SubscriptionType;
    attr: SubscriptionAttrAccountBalanceLimit | SubscriptionAttrOffchainWithdrawal | SubscriptionAttrTxHistoryReport | SubscriptionAttrIncomingBlockchainTx | SubscriptionAttrCompleteBlockchainTx;
}
