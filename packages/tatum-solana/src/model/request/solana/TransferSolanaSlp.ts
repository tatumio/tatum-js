import { IsIn, IsNotEmpty, IsNumberString, Length, Matches, Max, Min } from 'class-validator'
import { Currency } from '@tatumio/tatum-core/dist/model/request/Currency'
import { PrivateKeyOrSignatureId } from '@tatumio/tatum-core/dist/model/request/PrivateKeyOrSignatureId'

export class TransferSolanaSlp extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(44, 44)
  public to: string

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public amount: string

  @IsNotEmpty()
  @IsIn([Currency.SOL])
  public currency?: Currency

  @IsNotEmpty()
  @Length(44, 44)
  public contractAddress: string

  @IsNotEmpty()
  @Min(0)
  @Max(100)
  public decimals: number

  @IsNotEmpty()
  @Length(44, 44)
  public from: string
}
