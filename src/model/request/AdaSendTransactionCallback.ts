import { IsNotEmpty } from 'class-validator'
import { AdaBlockChainInfo, AdaTransaction } from '../response'
import { AdaUtxo } from './AdaUtxo'

export class AdaSendTransactionCallback {

  @IsNotEmpty()
  public adaGetBlockChainInfo: () => Promise<AdaBlockChainInfo>

  @IsNotEmpty()
  public adaGetTransaction: (hash: string) => Promise<AdaTransaction>

  @IsNotEmpty()
  public adaGetUtxos: (address: string) => Promise<AdaUtxo[]>
}