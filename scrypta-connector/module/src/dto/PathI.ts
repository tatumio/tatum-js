import { Transform } from 'class-transformer';
import { Min } from 'class-validator';

export class PathI {
  @Transform((v) => (v.match(/^\d+$/) ? parseInt(v, 10) : v))
  @Min(0)
  public i: number;
}
