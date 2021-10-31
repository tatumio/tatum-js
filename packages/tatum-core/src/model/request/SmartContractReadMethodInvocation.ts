import { IsNotEmpty, IsNotEmptyObject, Length } from 'class-validator'

export class SmartContractReadMethodInvocation {
  @IsNotEmpty()
  @Length(42, 43)
  public contractAddress: string

  @IsNotEmpty()
  public params: any[]

  @IsNotEmptyObject()
  public methodABI: any

  @IsNotEmpty()
  @Length(1, 500)
  public methodName: string
}
