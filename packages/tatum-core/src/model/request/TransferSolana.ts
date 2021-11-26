import { IsNotEmpty, IsNumberString, Length, Matches } from 'class-validator'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class TransferSolana extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(44, 44)
  public from: string

  @IsNotEmpty()
  @Length(44, 44)
  public to: string

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public amount: string
}
