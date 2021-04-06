import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import Web3 from 'web3'
import { PrepareEthBasedSignedOffchainTransaction } from './PrepareEthBasedSignedOffchainTransaction'

export class PrepareEthErc20SignedOffchainTransaction extends PrepareEthBasedSignedOffchainTransaction{
  @IsNotEmpty()
  @IsString()
  public tokenAddress: string
}