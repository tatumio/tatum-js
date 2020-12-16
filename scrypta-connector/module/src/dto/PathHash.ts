import { IsNotEmpty, Length } from 'class-validator';

export class PathHash {
  @IsNotEmpty()
  @Length(1, 64)
  public hash: string;
}
