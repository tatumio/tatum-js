import {IsIn, IsNotEmpty} from 'class-validator';
import {Currency} from './Currency';
import { DeployMultiToken } from './DeployMultiToken';

export class CeloDeployMultiToken extends DeployMultiToken {
    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency: Currency;
}
