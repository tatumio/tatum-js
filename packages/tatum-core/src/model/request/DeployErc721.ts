import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { BaseDeployErc721 } from './BaseDeployErc721'
import { Fee } from './Fee'

export class DeployErc721 extends BaseDeployErc721 {
  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee
}
