import { IsNotEmpty, Length, Min, ValidateIf } from 'class-validator'
import { GenerateCustodialAddress, Currency } from '@tatumio/tatum-core'

export class GenerateTronCustodialAddress extends GenerateCustodialAddress {
  @ValidateIf((o) => o.signatureId && o.chain === Currency.TRON)
  @IsNotEmpty()
  @Length(34, 34)
  public from?: string

  @ValidateIf((o) => o.chain === Currency.TRON)
  @IsNotEmpty()
  @Min(0)
  public feeLimit?: number
}

export type ChainGenerateTronCustodialAddress = Omit<GenerateTronCustodialAddress, 'chain'>
