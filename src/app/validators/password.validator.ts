import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) {
      return { required: true };
    }

    // Check for at least 8 characters
    if (value.length < 8) {
      return { minLength: true };
    }

    // Check for at least 1 uppercase letter
    if (!/[A-Z]/.test(value)) {
      return { uppercase: true };
    }

    // Check for at least 1 numeric digit
    if (!/\d/.test(value)) {
      return { numeric: true };
    }

    // Check for at least 1 special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return { specialCharacter: true };
    }

    // All requirements met
    return null;
  };
}
