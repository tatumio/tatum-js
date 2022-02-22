import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
  Min,
  Validate,
  ValidateIf,
} from 'class-validator'
import { Currency } from './Currency'
import { Mint721BatchBuiltInPrivateKeyValidator } from '../validation/Mint721BatchBuiltInPrivateKeyValidator'

export class MintMultipleErc721 {

  @IsNotEmpty()
  @IsArray()
  public to: string[];

  @IsNotEmpty()
  @IsArray()
  public tokenId: string[];

  @Validate(Mint721BatchBuiltInPrivateKeyValidator)
  @IsNotEmpty()
  @IsArray()
  public url: string[];

  @IsOptional()
  @Length(42, 43)
  public minter?: string;

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.KLAY, Currency.ONE, Currency.MATIC])
  public chain: Currency;

  @IsNotEmpty()
  @Length(42, 43)
  public contractAddress: string;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  @IsBoolean()
  @IsOptional()
  @ValidateIf(o => o.provenance && o.fixedValues)
  public provenance?: boolean;

  @IsArray()
  @IsOptional()
  @ValidateIf(o => o.authorAddresses && o.cashbackValues)
  public authorAddresses?: string[][];

  @IsArray()
  @IsOptional()
  @ValidateIf(o => o.authorAddresses && o.cashbackValues)
  public cashbackValues?: string[][];

  @IsOptional()
  @IsArray()
  @ValidateIf(o => o.provenance && o.fixedValues)
  public fixedValues?: string[][];

  @IsOptional()
  @ValidateIf(o => o.authorAddresses && o.cashbackValues)
  public erc20?: string;

  @IsOptional()
  @Length(64, 66)
  public fromPrivateKey?: string;

  @IsOptional()
  @IsUUID('4')
  public signatureId?: string;

  @ValidateIf(o => o.signatureId)
  @IsOptional()
  @Min(0)
  public index?: number;
}
