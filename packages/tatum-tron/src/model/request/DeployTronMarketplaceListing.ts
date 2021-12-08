import { IsNotEmpty, Length, Min, ValidateIf } from 'class-validator'
import { Currency, DeployMarketplaceListing } from '@tatumio/tatum-core'

export class DeployTronMarketplaceListing extends DeployMarketplaceListing {
  @ValidateIf((o) => o.signatureId && o.chain === Currency.TRON)
  @IsNotEmpty()
  @Length(34, 34)
  public from?: string

  @ValidateIf((o) => o.chain === Currency.TRON)
  @IsNotEmpty()
  @Min(0)
  public feeLimit?: number
}

export type ChainDeployTronMarketplaceListing = Omit<DeployTronMarketplaceListing, 'chain'>
