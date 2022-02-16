import { IsBoolean, IsIn, IsNotEmpty, IsOptional, Length, MaxLength, Min, Validate, ValidateIf } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureIdBuiltInPrivateKey } from './PrivateKeyOrSignatureIdBuiltInPrivateKey'
import { Mint721BuiltInPrivateKeyValidator } from '../validation/Mint721BuiltInPrivateKeyValidator'

export class MintErc721 extends PrivateKeyOrSignatureIdBuiltInPrivateKey {

  @IsNotEmpty()
  @Length(42, 43)
  public to: string;

  @IsNotEmpty()
  @MaxLength(256)
  public url: string;

  @Validate(Mint721BuiltInPrivateKeyValidator)
  @IsOptional()
  @MaxLength(256)
  public tokenId?: string;

  @IsOptional()
  @Length(42, 43)
  public minter?: string;

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.KLAY, Currency.TRON, Currency.ONE, Currency.MATIC])
  public chain: Currency;

  @Validate(Mint721BuiltInPrivateKeyValidator)
  @IsOptional()
  @Length(42, 43)
  public contractAddress?: string;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  @IsOptional()
  @ValidateIf(o => o.provenance && o.fixedValues)
  @IsBoolean()
  public provenance?: boolean;

  @IsOptional()
  @ValidateIf(o => o.authorAddresses && o.cashbackValues && o.fixedValues)
  public authorAddresses?: string[];

  @IsOptional()
  @ValidateIf(o => o.authorAddresses && o.cashbackValues && o.fixedValues)
  public cashbackValues?: string[];

  @IsOptional()
  @ValidateIf(o => o.provenance && o.fixedValues)
  public fixedValues?: string[];

  @IsOptional()
  @ValidateIf(o => o.authorAddresses && o.cashbackValues)
  public erc20?: string;

}
