import { BigNumber } from 'bignumber.js'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'amountDecimalValidator', async: false })
export class AmountDecimalValidator implements ValidatorConstraintInterface {
  public defaultMessage(_validationArguments?: ValidationArguments) {
    return "amount can't have more then 0 decimals."
  }

  public validate(value: any, _validationArguments?: ValidationArguments) {
    return new BigNumber(value.amount || 0).decimalPlaces() === 0
  }
}
