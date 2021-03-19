import { registerDecorator, ValidationOptions } from 'class-validator';
import BigNumber from 'bignumber.js'

export const IsInRange = (min: number, max: number, validationOptions?: ValidationOptions) => function (object: Object, propertyName: string) {
  registerDecorator({
    name: 'isInRange',
    target: object.constructor,
    propertyName: propertyName,
    constraints: [min, max],
    options: {
      message: `${propertyName} must be between ${min} and ${max}`,
      ...validationOptions
    },
    validator: {
      validate(value: any) {
        return new BigNumber(value).lte(max) && new BigNumber(value).gte(min)
      },
    },
  });
}