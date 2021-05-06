import {Type} from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import {Fee} from './Fee';
import { DeployErc20 } from './DeployErc20'

export class DeployEthErc20 extends DeployErc20 {
}
