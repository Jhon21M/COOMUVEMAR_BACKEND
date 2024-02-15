import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsBufferString(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsBufferString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!(value instanceof Buffer)) {
            return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a Buffer object`;
        },
      },
    });
  };
}
