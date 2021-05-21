import { IsIn, IsNotEmpty, } from 'class-validator';
import { Currency } from './Currency';
import { BurnMultiTokenBatch } from './BurnMultiTokenBatch';

export class CeloBurnMultiTokenBatch extends BurnMultiTokenBatch {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
