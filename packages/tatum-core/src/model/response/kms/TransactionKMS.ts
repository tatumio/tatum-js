import { Currency } from '../../request'
import { ChainTransactionKMS } from 'src/model/response/kms/ChainTransactionKMS'

export class TransactionKMS extends ChainTransactionKMS {
  public chain: Currency
}
