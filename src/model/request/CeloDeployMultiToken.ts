import {IsIn, IsNotEmpty} from 'class-validator'
import {Currency} from './Currency'

// import { BaseDeployMultiToken } from './BaseDeployMultiToken'
// export class CeloDeployMultiToken extends BaseDeployMultiToken {

import { DeployMultiToken } from './DeployMultiToken'
export class CeloDeployMultiToken extends DeployMultiToken {
    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency: Currency;
}
