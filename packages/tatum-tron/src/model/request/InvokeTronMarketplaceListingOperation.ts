import { Currency, InvokeMarketplaceListingOperation } from '@tatumio/tatum-core'
import { IsNotEmpty, Length, Min, ValidateIf } from 'class-validator'

export class InvokeTronMarketplaceListingOperation extends InvokeMarketplaceListingOperation {
  @ValidateIf((o) => o.signatureId && o.chain === Currency.TRON)
  @IsNotEmpty()
  @Length(34, 34)
  public from?: string

  @ValidateIf((o) => o.chain === Currency.TRON)
  @IsNotEmpty()
  @Min(0)
  public feeLimit: number
}
