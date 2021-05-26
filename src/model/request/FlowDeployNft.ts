import {IsIn, IsNotEmpty} from 'class-validator';
import {Currency} from './Currency';
import {FlowMnemonicOrPrivateKeyOrSignatureId} from './FlowMnemonicOrPrivateKeyOrSignatureId';

export class FlowDeployNft extends FlowMnemonicOrPrivateKeyOrSignatureId {
    @IsNotEmpty()
    @IsIn([Currency.FLOW])
    public chain: Currency;
}
