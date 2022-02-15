import { IsBoolean, IsIn, IsNotEmpty, IsOptional, Min } from 'class-validator'
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class DeployMultiToken extends PrivateKeyOrSignatureId {

  @IsNotEmpty()
  public uri: string;

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC, Currency.KLAY])
  public chain: Currency;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  @IsBoolean()
  @IsOptional()
  public publicMint?: boolean;
}
