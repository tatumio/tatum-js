import { IsNotEmpty, Length } from 'class-validator';

export class PathHash {
  @IsNotEmpty()
  @Length(1, 70)
  public hash: string;
}
