import { MintMultiTokenBatch, Currency } from '@tatumio/tatum-core';
import {IsIn, IsNotEmpty} from 'class-validator'

export class CeloMintMultiTokenBatch extends MintMultiTokenBatch {

  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
