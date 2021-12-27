import { IsBoolean, IsIn, IsNotEmpty, IsOptional, Length, MaxLength, Min, Validate, ValidateIf } from 'class-validator'
import { Mint721BuiltInPrivateKeyValidator } from '../validation/Mint721BuiltInPrivateKeyValidator'
import { PrivateKeyOrSignatureIdBuiltInPrivateKey } from './PrivateKeyOrSignatureIdBuiltInPrivateKey'
import { Currency } from './Currency'

export class BaseMintErc721 extends PrivateKeyOrSignatureIdBuiltInPrivateKey {
  @IsNotEmpty()
  @Length(42, 43)
  public to: string

  @IsNotEmpty()
  @MaxLength(256)
  public url: string

  @Validate(Mint721BuiltInPrivateKeyValidator)
  public tokenId?: string

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.TRON, Currency.ONE, Currency.MATIC, Currency.KCS, Currency.GLMR])
  public chain: Currency

  @Validate(Mint721BuiltInPrivateKeyValidator)
  public contractAddress?: string

  @Min(0)
  @IsOptional()
  public nonce?: number

  @IsOptional()
  @ValidateIf((o) => o.provenance && o.fixedValues)
  @IsBoolean()
  public provenance?: boolean

  @IsOptional()
  @ValidateIf((o) => o.authorAddresses && o.cashbackValues && o.fixedValues)
  public authorAddresses?: string[]

  @IsOptional()
  @ValidateIf((o) => o.authorAddresses && o.cashbackValues && o.fixedValues)
  public cashbackValues?: string[]

  @IsOptional()
  @ValidateIf((o) => o.provenance && o.fixedValues)
  public fixedValues?: string[]

  @IsOptional()
  @ValidateIf((o) => o.authorAddresses && o.cashbackValues)
  public erc20?: string
}
