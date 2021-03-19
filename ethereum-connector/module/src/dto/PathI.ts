import { IsNumberString, Matches } from 'class-validator';

export class PathI {
  @IsNumberString()
  @Matches(/[0-9]+/)
  public i: string;
}
