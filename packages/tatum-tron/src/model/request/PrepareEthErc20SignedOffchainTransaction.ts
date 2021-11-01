import {IsNotEmpty, IsString} from 'class-validator';
import {PrepareEthBasedSignedOffchainTransaction} from './PrepareEthBasedSignedOffchainTransaction';

export class PrepareEthErc20SignedOffchainTransaction extends PrepareEthBasedSignedOffchainTransaction {
  @IsNotEmpty()
  @IsString()
  public tokenAddress: string;
}
