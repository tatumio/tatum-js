import { IsNotEmpty, Length } from 'class-validator';

export class PathAddress {

  @IsNotEmpty()
  @Length(7, 150)
  public address: string;
}
