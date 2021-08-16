import {IsIn, IsNotEmpty, IsNumberString, IsUUID, Length} from 'class-validator'
import {Currency} from './Currency'
import {FlowMnemonicOrPrivateKeyOrSignatureId} from './FlowMnemonicOrPrivateKeyOrSignatureId'

export class FlowTransferNft extends FlowMnemonicOrPrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(18, 18)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    public tokenId: string;

    @IsNotEmpty()
    @IsIn([Currency.FLOW])
    public chain: Currency;

    @IsNotEmpty()
    @IsUUID('4')
    public contractAddress: string;

}
