import {IsIn, IsNotEmpty, IsNumberString, IsUUID, MaxLength} from 'class-validator';
import {Currency} from './Currency';
import {FlowMnemonicOrPrivateKeyOrSignatureId} from './FlowMnemonicOrPrivateKeyOrSignatureId';

export class FlowBurnNft extends FlowMnemonicOrPrivateKeyOrSignatureId {

    @IsNotEmpty()
    @IsNumberString()
    public tokenId: string;

    @IsNotEmpty()
    @MaxLength(256)
    public url: string;

    @IsNotEmpty()
    @IsIn([Currency.FLOW])
    public chain: Currency;

    @IsNotEmpty()
    @IsUUID('4')
    public contractAddress: string;

}
