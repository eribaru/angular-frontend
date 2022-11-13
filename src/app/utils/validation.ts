import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static cpf( checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (checkControl?.value && !isValidCPF(checkControl.value )) {
        controls.get(checkControlName)?.setErrors({ cpf: true });
        return { cpf: true };
      } else {
        return null;
      }
    };
  }

  static cnpj( checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (checkControl?.value && !isCNPJ(checkControl.value )) {
        controls.get(checkControlName)?.setErrors({ cnpj: true });
        return { cnpj: true };
      } else {
        return null;
      }
    };
  }



}

function isValidCPF(value: string) {
  if (typeof value !== 'string') {
    return false;
  }

  value = value.replace(/\D+/g, '');

  if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
    return false;
  }

  if (/^([0-9])\1*$/.test(value)) {
    return { equalDigits: true };
  }

  const values = value.split('').map(el => +el);
  const rest = (count: number) => (values.slice(0, count-12).reduce( (soma, el, index) => (soma + el * (count-index)), 0 )*10) % 11 % 10;

  return rest(10) === values[9] && rest(11) === values[10];
}

export const isCNPJ = (value: string): boolean => {
  if (!/^(\d{14}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/.test(value)) return false;
  const numbers = mapToNumbers(value);
  if (isRepeatedArray(numbers)) return false;
  const validators = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const checkers = generateCheckSums(numbers, validators);
  return (
    numbers[12] === getRemaining(checkers[0]) &&
    numbers[13] === getRemaining(checkers[1])
  );
};

const isRepeatedArray = <T>(items: Array<T>): boolean =>
  items.every((item) => items[0] === item);

const mapToNumeric = (value: string): string => value.replace(/\D/g, '');

const mapToNumbers = (value: string): Array<number> =>
  mapToNumeric(value).split('').map(Number);

const getRemaining = (value: number): number =>
  value % 11 < 2 ? 0 : 11 - (value % 11);
const generateCheckSums = (
  numbers: Array<number>,
  validators: Array<number>
): CheckSums => {
  const initialCheckSums: CheckSums = [0, 0];

  return validators.reduce(
    ([checkerA, checkerB], validator, index) =>
      [
        index === 0 ? 0 : checkerA + numbers[index - 1] * validator,
        checkerB + numbers[index] * validator,
      ] as CheckSums,
    initialCheckSums
  );
};

type CheckSums = [number, number];
