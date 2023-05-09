import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorFieldsService {
  public nameSurnamePattern: string = '^[a-zA-ZÀ-ÿ]+([,.-]?[a-zA-ZÀ-ÿ ])*$';
  public emailPattern: string =
    '[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}';

  public passwordPattern: any =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

  public celularPattern: any = /^[0-9]{10}$/;

  equalFields(field1: string, field2: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(field2)?.setErrors({ noEquals: true });
        return { noEquals: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
