import {Type} from 'class-transformer';
import {
    IsIn,
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumber,
    IsUrl,
    Length,
    Matches,
    Max,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';
import {SubscriptionType} from '../response/ledger/SubscriptionType';

export class SubscriptionAttrAccountBalanceLimit {

    @MaxLength(38)
    @IsNotEmpty()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public limit: string;

    @IsNotEmpty()
    @IsIn(['account', 'available'])
    public typeOfBalance: string;
}

export class SubscriptionAttrOffchainWithdrawal {

    @IsNotEmpty()
    @Length(1, 30)
    @Matches(/^BTC|BNB|LTC|BCH|ETH|USDT|LEO|LINK|UNI|FREE|MKR|USDC|BAT|TUSD|PAX|PAXG|PLTC|XCON|MMY|[a-zA-Z0-9_]+$/)
    public currency: string;
}

export class SubscriptionAttrTxHistoryReport {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(720)
    public interval: number;
}

export class SubscriptionAttrIncomingBlockchainTx {

    @Length(24, 24)
    @IsNotEmpty()
    public id: string;

    @IsUrl()
    @IsNotEmpty()
    @MaxLength(500)
    public url: string;
}

export class SubscriptionAttrCompleteBlockchainTx {

    @IsNotEmpty()
    @Length(1, 30)
    @Matches(/^BTC|BNB|LTC|BCH|ETH|USDT|LEO|LINK|UNI|FREE|MKR|USDC|BAT|TUSD|PAX|PAXG|PLTC|XCON|MMY|[a-zA-Z0-9_]+$/)
    public currency: string;
}

export class CreateSubscription {

    @IsNotEmpty()
    @IsIn(Object.keys(SubscriptionType))
    public type: SubscriptionType;

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => SubscriptionAttrAccountBalanceLimit || SubscriptionAttrCompleteBlockchainTx
        || SubscriptionAttrOffchainWithdrawal || SubscriptionAttrTxHistoryReport || SubscriptionAttrIncomingBlockchainTx)
    public attr: SubscriptionAttrAccountBalanceLimit | SubscriptionAttrOffchainWithdrawal | SubscriptionAttrTxHistoryReport
        | SubscriptionAttrIncomingBlockchainTx | SubscriptionAttrCompleteBlockchainTx;
}
