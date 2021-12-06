import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, Length, ValidateNested } from 'class-validator'
import { Currency } from '@tatumio/tatum-core/dist/model/request/Currency'
import { PrivateKeyOrSignatureId } from '@tatumio/tatum-core/dist/model/request/PrivateKeyOrSignatureId'
import { SolanaNftMetadata } from './SolanaNftMetadata'

export class SolanaMintNft extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(44, 44)
  public from: string

  @IsNotEmpty()
  @Length(44, 44)
  public to: string

  @IsNotEmpty()
  @Type(() => SolanaNftMetadata)
  @ValidateNested({ each: true })
  public metadata: SolanaNftMetadata

  @IsNotEmpty()
  @IsIn([Currency.SOL])
  public chain: Currency
}

export type ChainSolanaMintNft = Omit<SolanaMintNft, 'chain'>
