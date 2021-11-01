import { IsIn, IsNotEmpty, IsOptional, Length, MaxLength, Min, ValidateIf } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class TronMintTrc721 extends PrivateKeyOrSignatureId {

  @IsNotEmpty()
  @Length(34, 34)
  public to: string;

  @IsNotEmpty()
  @Length(34, 34)
  public contractAddress: string;

  @ValidateIf(o => o.signatureId)
  @IsNotEmpty()
  @Length(34, 34)
  public from?: string;

  @IsNotEmpty()
  @Min(0)
  public feeLimit: number;

  @IsNotEmpty()
  @MaxLength(256)
  public url: string;

  @IsNotEmpty()
  @MaxLength(256)
  public tokenId: string;

  @IsNotEmpty()
  @IsIn([Currency.TRON])
  public chain: Currency;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  public authorAddresses?: string[];

  public cashbackValues?: string[];
}
