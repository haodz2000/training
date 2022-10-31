import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class StringNumber implements ValidatorConstraintInterface {
  validate(value: string) {
    const reg = new RegExp(/^[0-9]+$/);
    return reg.test(value);
  }
}

export function IsNumberString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'StringNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: StringNumber,
    });
  };
}
