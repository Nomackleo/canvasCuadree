import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorMessage } from 'src/app/models/error-message';
import { FirebaseCodeErrorsEnum } from '../../utils/firebase-code-errors-enum';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCodeErrorService {
  private messageSubject = new Subject<ErrorMessage>();
  message$ = this.messageSubject.asObservable();

  setMessage(message: ErrorMessage) {
    this.messageSubject.next(message);
  }

  firebaseError(code: string) {
    switch (code) {
      case FirebaseCodeErrorsEnum.emailAlreadyExist:
        return 'Otro usuario ya está utilizando el correo electrónico proporcionado. Cada usuario debe tener un correo electrónico único.';
      case FirebaseCodeErrorsEnum.emailAlreadyInUse:
        return 'Otro usuario ya está utilizando el correo electrónico proporcionado. Cada usuario debe tener un correo electrónico único.';
      case FirebaseCodeErrorsEnum.idTokenExpired:
        return 'El token de ID de Firebase que se proporcionó está vencido.';
      case FirebaseCodeErrorsEnum.internalError:
        return 'El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud.';
      case FirebaseCodeErrorsEnum.invalidDisplayName:
        return 'El valor que se proporcionó para la propiedad del usuario displayName no es válido. Debe ser una string que no esté vacía.';
      case FirebaseCodeErrorsEnum.invalidEmail:
        return 'El valor que se proporcionó para la propiedad del usuario email no es válido.';
      case FirebaseCodeErrorsEnum.invalidPassword:
        return 'El valor que se proporcionó para la propiedad del usuario password no es válido.';
      case FirebaseCodeErrorsEnum.wrongPassword:
        return 'El password que se proporcionó no es válido.';
      case FirebaseCodeErrorsEnum.invalidEmailVerified:
        return 'El valor que se proporcionó para la propiedad del usuario emailVerified no es válido. Debe ser un booleano.';
      case FirebaseCodeErrorsEnum.userNotFound:
        return 'No existe ningún registro de usuario que corresponda al identificador proporcionado.';

      default:
        return 'Error desconocido';
    }
  }
}
