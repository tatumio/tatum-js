import { IsNotEmpty, Length } from 'class-validator';

export class PathAddress {
  @IsNotEmpty()
  @Length(10, 150)
  public address: string;
}
