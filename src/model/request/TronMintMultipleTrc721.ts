import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateIf } from 'class-validator'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'
import { Currency } from './Currency'

export class TronMintMultipleTrc721 extends PrivateKeyOrSignatureId {

  @IsNotEmpty()
  @IsArray()
  public to: string[];

  @IsNotEmpty()
  @IsArray()
  public tokenId: string[];

  @IsNotEmpty()
  @IsArray()
  public url: string[];

  @IsNotEmpty()
  @IsIn([Currency.TRON])
  public chain: Currency;

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

  @ValidateIf(o => o.signatureId)
  @IsNotEmpty()
  @Length(34, 34)
  public from?: string;

  @IsNotEmpty()
  @Length(34, 34)
  public contractAddress: string;

  @IsNotEmpty()
  @Min(0)
  public feeLimit: number;
}
