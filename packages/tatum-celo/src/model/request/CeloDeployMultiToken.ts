import { BaseDeployMultiToken, Currency } from '@tatumio/tatum-core';
import {IsIn, IsNotEmpty} from 'class-validator'

export class CeloDeployMultiToken extends BaseDeployMultiToken {
    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency: Currency;
}
