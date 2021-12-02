import { IsIn, IsNotEmpty } from 'class-validator'
import { Currency } from './Currency'
import { ChainBaseMintErc721 } from './ChainBaseMintErc721'

export class BaseMintErc721 extends ChainBaseMintErc721 {
  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.TRON, Currency.ONE, Currency.MATIC, Currency.KCS])
  public chain: Currency
}
