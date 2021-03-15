import {IsIn, IsNotEmpty } from 'class-validator';
import {Currency} from './Currency';
import { DeployErc721 } from './DeployErc721'

export class CeloDeployErc721 extends DeployErc721 {
    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD])
    public feeCurrency: Currency;
}
