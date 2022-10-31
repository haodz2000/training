import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class Length implements ValidatorConstraintInterface {
  validate(value: string) {
    return value.length == 9 || value.length == 12;
  }
}

export function IsLength(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'Length',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: Length,
    });
  };
}
