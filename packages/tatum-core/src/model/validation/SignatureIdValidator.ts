import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'signatureId', async: false })
export class SignatureIdValidator implements ValidatorConstraintInterface {
  public defaultMessage(validationArguments?: ValidationArguments) {
    return 'Either signatureId, or privateKey/secret/fromPrivateKey must be present.'
  }

  public validate(value: any, validationArguments?: ValidationArguments) {
    const data = validationArguments?.object as any
    if (data.fromPrivateKey && data.signatureId) {
      return false
    }
    if (data.privateKey && data.signatureId) {
      return false
    }
    if (data.secret && data.signatureId) {
      return false
    }
    if (data.fromSecret && data.signatureId) {
      return false
    }
    return true
  }
}
