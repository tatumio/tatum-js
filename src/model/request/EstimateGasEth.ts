import {IsHexadecimal, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength} from 'class-validator';

export class EstimateGasEth {

  @IsNotEmpty()
  @Length(42, 43)
  public from: string;

  @IsNotEmpty()
  @Length(42, 43)
  public to: string;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
  public amount: string;

  @MaxLength(130000)
  @IsOptional()
  @IsHexadecimal()
  public data?: string;
}
