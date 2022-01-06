import { IsIn, IsNotEmpty, IsNumber, IsString, Length, Matches, Min } from 'class-validator'
import { TimeFrame } from '.'

export class GetOrderBook {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/)
  @Length(3, 30)
  public pair: string

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public from: number

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public to: number

  @IsNotEmpty()
  @IsIn(Object.keys(TimeFrame))
  public timeFrame: TimeFrame
}
