import { IsNotEmpty, Length } from 'class-validator';
import { PathI } from './PathI';

export class PathHashI extends PathI {
  @IsNotEmpty()
  @Length(10, 80)
  public hash: string;
}
