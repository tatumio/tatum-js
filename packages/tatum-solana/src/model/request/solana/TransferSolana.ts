import { IsNotEmpty, IsNumberString, Length, Matches } from 'class-validator'
import { PrivateKeyOrSignatureId } from '@tatumio/tatum-core/dist/model/request/PrivateKeyOrSignatureId'

export class TransferSolana extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(43, 44)
  public from: string

  @IsNotEmpty()
  @Length(43, 44)
  public to: string

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public amount: string
}
