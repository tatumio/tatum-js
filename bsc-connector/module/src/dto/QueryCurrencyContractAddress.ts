import { IsOptional, Length } from 'class-validator';
import { Currency } from '@tatumio/tatum';

export class QueryCurrencyContractAddress {
  @IsOptional()
  @Length(3, 5)
  public currency?: Currency;

  @IsOptional()
  @Length(42, 42)
  public contractAddress?: string;
}
