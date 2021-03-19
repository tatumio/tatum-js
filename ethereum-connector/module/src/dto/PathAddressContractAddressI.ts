import { PathAddressContractAddress } from './PathAddressContractAddress'
import { IsNumberString, Matches } from 'class-validator'

export class PathAddressContractAddressI extends PathAddressContractAddress {
  @IsNumberString()
  @Matches(/[0-9]+/)
  public i: string;
}