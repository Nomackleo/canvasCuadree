import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseCodeErrorService } from 'src/app/core/services/auth/firebase-code-error.service';
import { ValidatorFieldsService } from 'src/app/core/services/auth/validator-fields.service';
import { ErrorMessage } from 'src/app/models/error-message';
import { ErrorsComponent } from 'src/app/shared/components/errors/errors.component';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.css']
})
export class RecoverPassComponent implements OnInit {
    @ViewChild('errorsComponent', { static: false })
    errorsComponent!: ErrorsComponent;
    isLoading = false;
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private auth: Auth = inject(Auth);
    private router = inject(Router);
  
    private validatorFieldsService = inject(ValidatorFieldsService);
    private firebaseCodeErrorService = inject(FirebaseCodeErrorService);
  
    typeMessage!: string;
    // messagesErrors: Partial<ErrorMessage> = {
    //   title: '',
    //   code: '',
    //   message: '',
    //   suggestion: '',
    // };
    message!: Partial<ErrorMessage>
  
    isMessage: boolean = false;
    isError: boolean = false;
    isSuccess: boolean = false;
  
    public recoverPasswordForm: FormGroup = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorFieldsService.emailPattern),
        ],
      ],
    });
  
    ngOnInit(): void {}
  
    ngAfterViewInit(): void {
      // this.messagesErrors = {
      //   title: '',
      //   code: '',
      //   message: '',
      //   suggestion: '',
      // };
    }
  
    recoverPassword() {
      if (this.recoverPasswordForm.invalid) {
        return;
      }
      this.authService.recoverPassword(this.recoverPasswordForm.value.email);
    }
}
