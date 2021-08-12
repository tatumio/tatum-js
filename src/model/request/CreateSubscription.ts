import {Type} from 'class-transformer'
import {IsIn, IsNotEmpty, IsNotEmptyObject, IsNumber, IsUrl, Length, Matches, Max, MaxLength, Min, ValidateNested,} from 'class-validator'
import {SubscriptionType} from '../response/ledger/SubscriptionType'

abstract class Subscription {
    public __type?: string;
}

export class SubscriptionAttrAccountBalanceLimit extends Subscription {

    @MaxLength(38)
    @IsNotEmpty()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public limit: string;

    @IsNotEmpty()
    @IsIn(['account', 'available'])
    public typeOfBalance: string;
}

export class SubscriptionAttrOffchainWithdrawal extends Subscription {

    @IsNotEmpty()
    @Length(1, 30)
    @Matches(/^BTC|BNB|LTC|BCH|ETH|USDT|LEO|LINK|UNI|FREE|MKR|USDC|BAT|TUSD|PAX|PAXG|PLTC|XCON|MMY|[a-zA-Z0-9_]+$/)
    public currency: string;
}

export class SubscriptionAttrTxHistoryReport extends Subscription {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(720)
    public interval: number;
}

export class SubscriptionAttrIncomingBlockchainTx extends Subscription {

    @Length(24, 24)
    @IsNotEmpty()
    public id: string;

    @IsUrl()
    @IsNotEmpty()
    @MaxLength(500)
    public url: string;
}

export class SubscriptionAttrUrl extends Subscription {

    @IsUrl()
    @IsNotEmpty()
    @MaxLength(500)
    public url: string;
}

export class SubscriptionAttrCompleteBlockchainTx extends Subscription {

    @IsNotEmpty()
    @Length(1, 30)
    @Matches(/^BTC|BNB|LTC|BCH|ETH|USDT|LEO|LINK|UNI|FREE|MKR|USDC|BAT|TUSD|PAX|PAXG|PLTC|XCON|MMY|[a-zA-Z0-9_]+$/)
    public currency: string;
}

export class CreateSubscription {

    @IsNotEmpty()
    @IsIn(Object.values(SubscriptionType))
    public type: SubscriptionType;

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => Subscription, {
        discriminator: {
            property: '__type',
            subTypes: [
                {value: SubscriptionAttrAccountBalanceLimit, name: 'ACCOUNT_BALANCE_LIMIT'},
                {value: SubscriptionAttrUrl, name: 'KMS_FAILED_TX'},
                {value: SubscriptionAttrUrl, name: 'CUSTOMER_TRADE_MATCH'},
                {value: SubscriptionAttrUrl, name: 'TRANSACTION_IN_THE_BLOCK'},
                {value: SubscriptionAttrOffchainWithdrawal, name: 'OFFCHAIN_WITHDRAWAL'},
                {value: SubscriptionAttrTxHistoryReport, name: 'TRANSACTION_HISTORY_REPORT'},
                {value: SubscriptionAttrIncomingBlockchainTx, name: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION'},
                {value: SubscriptionAttrCompleteBlockchainTx, name: 'COMPLETE_BLOCKCHAIN_TRANSACTION'},
                {value: SubscriptionAttrIncomingBlockchainTx, name: 'ACCOUNT_PENDING_BLOCKCHAIN_TRANSACTION'},
            ],
        },
    })
    public attr: SubscriptionAttrAccountBalanceLimit | SubscriptionAttrOffchainWithdrawal | SubscriptionAttrTxHistoryReport
        | SubscriptionAttrIncomingBlockchainTx | SubscriptionAttrCompleteBlockchainTx | SubscriptionAttrUrl;
}
