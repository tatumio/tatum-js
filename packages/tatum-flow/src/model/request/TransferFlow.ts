import { IsIn, IsNotEmpty, IsNumberString, Length, Matches } from 'class-validator'
import { Currency } from '@tatumio/tatum-core'
import { FlowMnemonicOrPrivateKeyOrSignatureId } from './FlowMnemonicOrPrivateKeyOrSignatureId'

export class TransferFlow extends FlowMnemonicOrPrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(18, 18)
  public to: string

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public amount: string

  @IsNotEmpty()
  @IsIn([Currency.FLOW, Currency.FUSD])
  public currency: Currency
}
