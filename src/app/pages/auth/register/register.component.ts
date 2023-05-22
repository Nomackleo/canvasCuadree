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
  authState,
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
import { FirebaseService } from 'src/app/core/services/database/firebase.service';
import { UserBill } from 'src/app/models/bill';
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

  private router = inject(Router);
  private authService = inject(AuthService);
  private auth: Auth = this.authService.auth;
  private firebaseService = inject(FirebaseService);
  private validatorFieldsService = inject(ValidatorFieldsService);
  private firebaseCodeErrorService = inject(FirebaseCodeErrorService);

  user$ = authState(this.auth);

  private ngUnsubscribe = new Subject();

  private user: UserBill = {
    name: '',
    lastname: '',
    email: '',
    phone: undefined,
    address: '',
    uid: '',
  };

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
    this.message = {
      title: '',
      code: '',
      message: '',
      suggestion: '',
    };
    this.firebaseCodeErrorService.message$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((message) => {
        this.message = message;
        console.log(this.message);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
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
    this.user = {
      name: this.registerForm.value.name!,
      lastname: this.registerForm.value.lastname!,
      email: this.registerForm.value.email!,
    };
    this.user$.subscribe((user) => (this.user.uid = user?.uid));
    console.log(this.user);

    this.firebaseService.create(this.user);
    this.firebaseService.setUser(this.user);
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
