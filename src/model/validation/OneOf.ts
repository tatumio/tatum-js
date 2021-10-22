import { buildMessage, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/ban-types
export const OneOf = (oneOfFields: string[], validationOptions?: ValidationOptions) => (object: object, propertyName: string) => {
    registerDecorator({
        name: 'oneOf',
        target: object.constructor,
        propertyName,
        constraints: [oneOfFields],
        options: validationOptions,
        validator: {
            validate(value: any, args: ValidationArguments) {
                let isSet = false;
                for (const oneOfField in args.object) {
                    if(oneOfFields.includes(oneOfField)) {
                        // @ts-ignore
                        if(args.object[oneOfField]) {
                            if(isSet) {
                                return false
                            }
                            isSet = true
                        }
                    }
                }
                return isSet;
              },
            defaultMessage: buildMessage(
                () =>
                    `Exactly one of ${oneOfFields.join(", ")} fields can be filled.`,
                validationOptions,
            ),
        },
    });
};
