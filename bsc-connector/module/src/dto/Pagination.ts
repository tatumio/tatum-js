import {
  IsBooleanString,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional, Matches,
  ValidateIf,
} from 'class-validator';
import { IsInRange } from '../validators/IsInRange'

export class Pagination {
  @IsNumberString()
  @Matches(/[0-9]+/)
  @IsNotEmpty()
  @ValidateIf(o => o.count !== 'true')
  @IsInRange(1, 50)
  public pageSize: string;

  @IsNumberString()
  @Matches(/[0-9]+/)
  @IsOptional()
  public offset?: string;

  @IsBooleanString()
  @ValidateIf(o => !o.pageSize)
  @IsIn(['true'])
  @IsNotEmpty()
  public count?: string;
}
