import { IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, Min, ValidateIf } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class BaseTransferErc721 extends PrivateKeyOrSignatureId {
  @IsNotEmpty()
  @Length(42, 58)
  public to: string

  @IsNotEmpty()
  @MaxLength(256)
  public tokenId: string

  @IsNotEmpty()
  @Length(1, 43)
  public contractAddress: string

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.TRON, Currency.ONE, Currency.MATIC, Currency.ALGO, Currency.KCS])
  public chain: Currency

  @Min(0)
  @IsOptional()
  public nonce?: number

  @IsOptional()
  @IsNumberString()
  public value?: string

  @IsOptional()
  @ValidateIf((o) => o.provenanceData && o.tokenPrice && o.provenance)
  public provenance?: boolean

  @IsOptional()
  @ValidateIf((o) => o.provenanceData && o.tokenPrice && o.provenance)
  public provenanceData?: string

  @IsOptional()
  @IsNumberString()
  @ValidateIf((o) => o.provenanceData && o.tokenPrice && o.provenance)
  public tokenPrice?: string

  @ValidateIf((o) => o.chain === Currency.ALGO && o.signatureId)
  @IsNotEmpty()
  @Length(42, 58)
  public from?: string
}
