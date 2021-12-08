import { IsArray, IsIn, IsNotEmpty, IsUUID } from 'class-validator'
import { Currency } from '@tatumio/tatum-core'
import { FlowMnemonicOrPrivateKeyOrSignatureId } from './FlowMnemonicOrPrivateKeyOrSignatureId'

export class FlowMintMultipleNft extends FlowMnemonicOrPrivateKeyOrSignatureId {
  @IsNotEmpty()
  @IsArray()
  public to: string[]

  @IsNotEmpty()
  @IsArray()
  public url: string[]

  @IsNotEmpty()
  @IsIn([Currency.FLOW])
  public chain: Currency

  @IsNotEmpty()
  @IsUUID('4')
  public contractAddress: string
}

export type ChainFlowMintMultipleNft = Omit<FlowMintMultipleNft, 'chain'>
