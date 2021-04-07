import { Exclude } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import Web3 from 'web3'

export class PrepareEthBasedSignedOffchainTransaction {
  @IsNotEmpty()
  @IsString()
  public amount: string

  @IsNotEmpty()
  @IsString()
  @Length(66, 66)
  public privateKey: string

  @IsNotEmpty()
  @Length(42, 42)
  @IsString()
  public address: string

  @Exclude()
  public web3: Web3

  @IsNotEmpty()
  @IsString()
  public gasPrice: string

  @IsOptional()
  @IsString()
  public gasLimit?: string

  @IsOptional()
  @IsNumber()
  public nonce?: number
}