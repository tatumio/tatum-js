import { BigNumber } from 'bignumber.js'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'priceDecimalValidator', async: false })
export class PriceDecimalValidator implements ValidatorConstraintInterface {
  public defaultMessage(_validationArguments?: ValidationArguments) {
    return "price can't have more then 18 decimals."
  }

  public validate(value: any, _validationArguments?: ValidationArguments) {
    if (value.erc20Address) {
      return new BigNumber(value.price || 0).decimalPlaces() <= 18
    }
    return true
  }
}
