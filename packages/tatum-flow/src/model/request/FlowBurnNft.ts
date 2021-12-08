import { IsIn, IsNotEmpty, IsNumberString, IsUUID } from 'class-validator'
import { Currency } from '@tatumio/tatum-core'
import { FlowMnemonicOrPrivateKeyOrSignatureId } from './FlowMnemonicOrPrivateKeyOrSignatureId'

export class FlowBurnNft extends FlowMnemonicOrPrivateKeyOrSignatureId {
  @IsNotEmpty()
  @IsNumberString()
  public tokenId: string

  @IsNotEmpty()
  @IsIn([Currency.FLOW])
  public chain: Currency

  @IsNotEmpty()
  @IsUUID('4')
  public contractAddress: string
}

export type ChainFlowBurnNft = Omit<FlowBurnNft, 'chain'>
