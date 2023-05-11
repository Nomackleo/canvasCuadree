import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification } from '@angular/fire/auth';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/core/services/auth/firebase-code-error.service';
import { ValidatorFieldsService } from 'src/app/core/services/auth/validator-fields.service';
import { ErrorMessage } from 'src/app/models/error-message';
import { ErrorsComponent } from 'src/app/shared/components/errors/errors.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('errorsComponent', { static: false })
  errorsComponent!: ErrorsComponent;

  isLoading = false;
  private fb = inject(FormBuilder);
  private auth: Auth = inject(Auth);
  private router = inject(Router);

  private validatorFieldsService = inject(ValidatorFieldsService);
  private firebaseCodeErrorService = inject(FirebaseCodeErrorService);

  typeMessage!: string;
  messagesErrors: Partial<ErrorMessage> = {
    title: '',
    code: '',
    message: '',
    suggestion: '',
  };

  isMessage: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;

  public registerForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorFieldsService.nameSurnamePattern),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorFieldsService.nameSurnamePattern),
        ],
      ],
      username: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorFieldsService.emailPattern),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.validatorFieldsService.passwordPattern),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.validatorFieldsService.passwordPattern),
        ],
      ],
    },
    {
      validators: [
        this.validatorFieldsService.equalFields('password', 'confirmPassword'),
      ],
    } as AbstractControlOptions
  );

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.typeMessage = '';
    this.messagesErrors = {
      title: '',
      code: '',
      message: '',
      suggestion: '',
    };
  }

  signUp() {
    console.log(this.registerForm);

    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        this.isLoading = false;
        // this.router.navigate(['/auth/login']);
        this.verificationEmail();
      })
      .catch((error) => {
        this.messagesErrors = {
          title: 'Error',
          message: this.firebaseCodeErrorService.firebaseError(error.code),
          suggestion: 'Por favor soluciona el problema para poder continuar',
        };
        this.firebaseCodeErrorService.setMessage(this.messagesErrors);
        this.isError = true;

        console.log(error);
      });
    this.registerForm.reset();
  }

  verificationEmail() {
    sendEmailVerification(this.auth.currentUser!).then(() => {
      this.isLoading = false;
      this.messagesErrors = {
        title: 'Email de verificación',
        message:
          'El usuario fue registrado con éxito, se ha enviado un email de verificación',
        suggestion:
          'Revisa tu email, sigue las instrucciones y disfruta de Cuadree',
      };
      this.firebaseCodeErrorService.setMessage(this.messagesErrors);
      this.isSuccess = true;

      this.router.navigate(['/auth/login']);
    });
  }

  get emailErrorMsg(): string {
    const errors = this.registerForm.get('email')?.errors;
    if (errors?.['required']) {
      return 'Email es obligatorio';
    } else if (errors?.['pattern']) {
      return 'El valor ingresado no tiene formato de correo';
    } else if (errors?.['emailTomado']) {
      return 'El email ya fue tomado';
    }

    return '';
  }

  fieldInvalid(field: string) {
    return (
      this.registerForm.get(field)?.invalid &&
      this.registerForm.get(field)?.touched
    );
  }

}
