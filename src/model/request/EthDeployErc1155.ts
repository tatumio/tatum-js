import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator';
import { DeployErc1155 } from './DeployErc1155'
import { Fee } from './Fee'

export class EthDeployErc1155 extends DeployErc1155 {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;
}
