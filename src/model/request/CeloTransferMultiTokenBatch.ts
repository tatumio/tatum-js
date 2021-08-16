import { IsIn, IsNotEmpty, } from 'class-validator'
import { Currency } from './Currency'
import { TransferMultiTokenBatch } from './TransferMultiTokenBatch'

export class CeloTransferMultiTokenBatch extends TransferMultiTokenBatch {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
