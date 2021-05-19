import {IsIn, IsNotEmpty} from 'class-validator';
import {Currency} from './Currency';
import { DeployErc1155 } from './DeployErc1155';

export class CeloDeployErc1155 extends DeployErc1155 {
    @IsNotEmpty()
    @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
    public feeCurrency: Currency;
}
