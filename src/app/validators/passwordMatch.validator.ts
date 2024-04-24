import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  if (password && repeatPassword && password.value !== repeatPassword.value) {
    return { 'passwordMismatch': true };
  }

  return null;
}
