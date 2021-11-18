import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { CreateErc20Offchain } from './CreateErc20Offchain'

@ValidatorConstraint({ name: 'xpubAddress', async: false })
export class CreateErc20Validator implements ValidatorConstraintInterface {
  public defaultMessage(_validationArguments?: ValidationArguments) {
    return 'Either xpub, or address must be present.'
  }

  public validate(_value: any, validationArguments?: ValidationArguments) {
    const data = validationArguments?.object as CreateErc20Offchain
    return !(data.xpub && data.address)
  }
}
