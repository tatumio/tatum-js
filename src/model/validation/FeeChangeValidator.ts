import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'

@ValidatorConstraint({name: 'feeAndChange', async: false})
export class FeeChangeValidator implements ValidatorConstraintInterface {
  public defaultMessage(validationArguments?: ValidationArguments) {
    return 'Either fee or changeAddress missing. Provide either both fee and changeAddress parameters, or provide none of them.'
  }

  public validate(value: any, validationArguments?: ValidationArguments) {
    const data = validationArguments?.object as any

    if (data.fee && !data.changeAddress) {
      return false
    }
    if (data.changeAddress && !data.fee) {
      return false
    }
    return true
  }

}
