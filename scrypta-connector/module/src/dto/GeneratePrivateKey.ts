import { IsInt, IsNotEmpty, Max, MaxLength, Min } from 'class-validator';

export class GeneratePrivateKey {
  @IsNotEmpty()
  @MaxLength(500)
  public mnemonic: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2147483647)
  public index: number;
}
