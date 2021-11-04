import {IsIn, IsNotEmpty, IsUUID, Length, MaxLength} from 'class-validator'
import {Currency} from '@tatumio/tatum-core'
import {FlowMnemonicOrPrivateKeyOrSignatureId} from './FlowMnemonicOrPrivateKeyOrSignatureId'

export class FlowMintNft extends FlowMnemonicOrPrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(18, 18)
    public to: string;

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
