import { IsNotEmpty, Length } from 'class-validator';
import { PathI } from './PathI';

export class PathXpubI extends PathI {
  @IsNotEmpty()
  @Length(5, 192)
  public xpub: string;
}
