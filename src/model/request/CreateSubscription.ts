import {Type} from 'class-transformer';
import {
    IsIn,
    IsNotEmpty,
    IsNotEmptyObject,
    IsOptional,
    IsUrl,
    Length,
    Matches,
    Max,
    MaxLength,
    Min,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import {SubscriptionType} from '../response/ledger/SubscriptionType';

export class SubscriptionAttr {

    @IsOptional()
    @Length(1, 30)
    @Matches(/^BTC|ADA|BNB|LTC|BCH|ETH|USDT|LEO|LINK|UNI|FREE|MKR|USDC|BAT|TUSD|PAX|PAXG|PLTC|XCON|MMY|[a-zA-Z0-9_]+$/)
    public currency?: string;

    @MaxLength(38)
    @ValidateIf(o => o.typeOfBalance)
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public limit?: string;

    @ValidateIf(o => o.limit)
    @IsIn(['account', 'available'])
    public typeOfBalance?: string;

    @Length(24, 24)
    @ValidateIf(o => o.url)
    public id?: string;

    @IsUrl()
    @ValidateIf(o => o.id)
    @MaxLength(500)
    public url?: string;

    @IsOptional()
    @Min(1)
    @Max(720)
    public interval?: number;
}

export class CreateSubscription {

    @IsNotEmpty()
    @IsIn(Object.keys(SubscriptionType))
    public type: SubscriptionType;

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => SubscriptionAttr)
    public attr: SubscriptionAttr;
}
