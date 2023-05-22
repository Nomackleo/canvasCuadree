import { Component, OnInit, inject } from '@angular/core';
import { Auth, User, authState, getRedirectResult } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseCodeErrorService } from 'src/app/core/services/auth/firebase-code-error.service';
import { ValidatorFieldsService } from 'src/app/core/services/auth/validator-fields.service';
import { ErrorMessage } from 'src/app/models/error-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth: Auth = inject(Auth);
  private router = inject(Router);
  user$ = authState(this.auth);
  private authService = inject(AuthService);

  private validatorFieldsService = inject(ValidatorFieldsService);
  private firebaseCodeErrorService = inject(FirebaseCodeErrorService);

  private ngUnsubscribe = new Subject();

  message!: Partial<ErrorMessage>;

  isLoading: boolean = false;

  isMessage: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;

  public loginForm: FormGroup = this.fb.group({
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
  });

  ngOnInit(): void {
    getRedirectResult(this.auth)
      .then((result) => {
        if (!result) {
          return;
        }

        this.updateUserData(result!.user);
        this.router.navigate(['/canvas']);
      })
      .catch((error) => console.log(error));
    this.firebaseCodeErrorService.message$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((message) => {
        this.message = message;
        console.log(this.message);
      });
    console.log(this.isSuccess);
  }

  ngAfterViewInit(): void {
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
  updateUserData(result: User) {}

  login() {
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then((user) => {
        this.isLoading = false;
        this.isError = true;
      });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }
}
