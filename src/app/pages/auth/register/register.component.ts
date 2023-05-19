import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from '@angular/fire/auth';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseCodeErrorService } from 'src/app/core/services/auth/firebase-code-error.service';
import { ValidatorFieldsService } from 'src/app/core/services/auth/validator-fields.service';
import { ErrorMessage } from 'src/app/models/error-message';
import { ErrorsComponent } from 'src/app/shared/components/errors/errors.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('errorsComponent', { static: false })
  errorsComponent!: ErrorsComponent;

  isLoading = false;
  private fb = inject(FormBuilder);
  private auth: Auth = inject(Auth);
  private router = inject(Router);
  private authService = inject(AuthService);
  private validatorFieldsService = inject(ValidatorFieldsService);
  private firebaseCodeErrorService = inject(FirebaseCodeErrorService);

  private ngUnsubscribe = new Subject();

  typeMessage!: string;
  message!: Partial<ErrorMessage>;

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

  ngOnInit(): void {
    this.firebaseCodeErrorService.message$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((message) => {
        this.message = message;
        console.log(this.message);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe;
  }
  ngAfterViewInit(): void {}
  signUp() {
    this.isLoading = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService
      .signUp(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.confirmPassword
      )
      .then(() => {
        this.isLoading = false;
        this.isSuccess = true;
      })
      .catch(() => {
        this.isLoading = false;
        this.isError = true;
      });
    this.registerForm.reset();
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
