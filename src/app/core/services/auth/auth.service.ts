import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from './firebase-code-error.service';
import { Firestore } from '@angular/fire/firestore';
import {
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  authState,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from '@angular/fire/auth';
import { filter, map } from 'rxjs';
import { ErrorMessage } from 'src/app/models/error-message';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private firebaseCodeErrorService = inject(FirebaseCodeErrorService);
  firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  private providerGoogle = new GoogleAuthProvider();
  private providerFacebook = new FacebookAuthProvider();

  messagesErrors: Partial<ErrorMessage> = {
    title: '',
    code: '',
    message: '',
    suggestion: '',
  };

  isLoading = false;

  isMessage: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;

  ngAfterViewInit(): void {
    this.messagesErrors = {
      title: '',
      code: '',
      message: '',
      suggestion: '',
    };
  }
  // Create a user observable
  user$ = authState(this.auth).pipe(
    filter((user) => user !== null),
    map((user) => user!)
  );

  // Get into as guest
  loginGuest() {
    signInAnonymously(this.auth);
  }

  // Popup Google
  loginGooglePopup() {
    signInWithRedirect(this.auth, this.providerGoogle);
  }

  // login with Google
  loginWithGoogle() {
    signInWithRedirect(this.auth, this.providerGoogle);
  }

  loginWithFacebook() {
    signInWithRedirect(this.auth, this.providerFacebook);
  }

  // login with email and password
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((user) => {
        this.isLoading = true;
        console.log(user);
        this.messagesErrors = {
          title: 'Verificación de cuenta',
          message:
            'Te escribimos para informarte que se ha enviado un correo electrónico a la dirección proporcionada durante tu registro, con el fin de verificar tu cuenta. Por favor, revisa tu bandeja de entrada y la carpeta de correo no deseado en caso de que el correo haya sido filtrado por error.',
          suggestion:
            'Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nuestro equipo de soporte.',
        };
        user.user.emailVerified
          ? this.router.navigate(['/canvas'])
          : this.firebaseCodeErrorService.setMessage(this.messagesErrors);
        this.isMessage = true;
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
        this.messagesErrors = {
          title: 'Error',
          message: this.firebaseCodeErrorService.firebaseError(error.code),
          suggestion:
            'Por favor soluciona el problema para poder continuar, o contacta con el administrador',
        };
        this.firebaseCodeErrorService.setMessage(this.messagesErrors);
        this.isError = true;
      });
  }

  signUp(registerForm: FormGroup, email: string, password: string) {}

  async signOut(auth: Auth) {
    return auth
      .signOut()
      .then(() => this.router.navigate(['/canvas']))
      .catch((error) => console.warn(error));
  }
}
