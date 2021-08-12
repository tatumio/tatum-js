import {IsIn, IsNotEmpty} from 'class-validator'
import {Currency} from './Currency'
import {MintMultiTokenBatch} from './MintMultiTokenBatch'

export class CeloMintMultiTokenBatch extends MintMultiTokenBatch {

  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency: Currency;
}
