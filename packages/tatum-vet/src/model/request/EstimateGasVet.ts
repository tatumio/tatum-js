import { IsInt, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength, Min } from 'class-validator'

export class EstimateGasVet {
  @IsNotEmpty()
  @Length(66, 66)
  public from: string

  @IsNotEmpty()
  @Length(42, 42)
  public to: string

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public value: string

  @IsOptional()
  @MaxLength(10000)
  public data?: string

  @Min(0)
  @IsOptional()
  @IsInt()
  public nonce?: number
}
