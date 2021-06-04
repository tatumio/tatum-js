import {IsIn, IsNotEmpty,} from 'class-validator';
import {BurnMultiTokenBatch} from './BurnMultiTokenBatch';
import {Currency} from './Currency';

export class CeloBurnMultiTokenBatch extends BurnMultiTokenBatch {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
