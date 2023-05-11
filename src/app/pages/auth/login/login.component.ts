import { Component, OnInit, inject } from '@angular/core';
import { Auth, User, authState, getRedirectResult } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseCodeErrorService } from 'src/app/core/services/auth/firebase-code-error.service';
import { ValidatorFieldsService } from 'src/app/core/services/auth/validator-fields.service';
import { ErrorMessage } from 'src/app/models/error-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth: Auth = inject(Auth);
  private router = inject(Router);
  // private provider = new GoogleAuthProvider();
  user$ = authState(this.auth);
  private authService = inject(AuthService);

  private validatorFieldsService = inject(ValidatorFieldsService);
  private firebaseCodeErrorService = inject(FirebaseCodeErrorService);

  messagesErrors: Partial<ErrorMessage> = {
    title: '',
    code: '',
    message: '',
    suggestion: '',
  };

  isLoading: boolean = this.authService.isLoading;

  isMessage: boolean = this.authService.isMessage;
  isError: boolean = this.authService.isError;
  isSuccess: boolean = this.authService.isSuccess;

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
    getRedirectResult(this.auth).then((result) => {
      if (!result) {
        return;
      }
      this.updateUserData(result!.user);
      this.router.navigate(['/frame']);
    });
  }

  ngAfterViewInit(): void {
    this.messagesErrors = {
      title: '',
      code: '',
      message: '',
      suggestion: '',
    };
  }

  updateUserData(result: User) {}

  login() {
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  loginWithGoogle() {
    // signInWithRedirect(this.auth, this.provider);
    this.authService.loginWithGoogle();
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

}
