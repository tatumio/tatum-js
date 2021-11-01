import { IsNotEmpty, IsString } from 'class-validator'
import { PrepareEthBasedSignedOffchainTransaction } from './PrepareEthBasedSignedOffchainTransaction'

export class PrepareEthSignedOffchainTransaction extends PrepareEthBasedSignedOffchainTransaction {
  @IsString()
  @IsNotEmpty()
  public currency: string
}