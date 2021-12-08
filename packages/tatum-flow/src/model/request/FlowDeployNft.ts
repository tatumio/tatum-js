import { IsIn, IsNotEmpty } from 'class-validator'
import { Currency } from '@tatumio/tatum-core'
import { FlowMnemonicOrPrivateKeyOrSignatureId } from './FlowMnemonicOrPrivateKeyOrSignatureId'

export class FlowDeployNft extends FlowMnemonicOrPrivateKeyOrSignatureId {
  @IsNotEmpty()
  @IsIn([Currency.FLOW])
  public chain: Currency
}

export type ChainFlowDeployNft = Omit<FlowDeployNft, 'chain'>
