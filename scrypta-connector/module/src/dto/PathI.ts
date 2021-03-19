import { Transform } from 'class-transformer';
import { Min } from 'class-validator';

export class PathI {
  @Min(0)
  public i: number;
}
