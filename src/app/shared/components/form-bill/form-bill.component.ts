import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, User, authState } from '@angular/fire/auth';

import { ErrorsComponent } from '../errors/errors.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ClienBillService } from 'src/app/core/services/features/clien-bill.service';
import { ValidatorFieldsService } from 'src/app/core/services/auth/validator-fields.service';
import { FirebaseCodeErrorService } from 'src/app/core/services/auth/firebase-code-error.service';
import { Bill, BillMercadoPago, UserBill } from 'src/app/models/bill';
import { ErrorMessage } from 'src/app/models/error-message';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-form-bill',
  templateUrl: './form-bill.component.html',
  styleUrls: ['./form-bill.component.css'],
})
export class FormBillComponent implements OnInit {
  @ViewChild('errorsComponent', { static: false })
  errosComponent!: ErrorsComponent;

  isLoading = false;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private clientBillService = inject(ClienBillService);
  private validatorFieldsService = inject(ValidatorFieldsService);
  private firebaseCodeErrorService = inject(FirebaseCodeErrorService);
  // private mercadoPagoService = inject(MercadoPagoService);

  // mercadopago = this.mercadoPagoService.mercadopago;
  // mercadopago = new mercadopago(environment.mercadoPago.publicKey);
  // bricksBuilder = this.mercadopago.bricks();
  // mercadopago = mercadopago.
  private auth: Auth = this.authService.auth;
  user$ = authState(this.auth);

  declare Mercadopago: any;
  pay: boolean = false;
  user: boolean = false;

  billMercadoPago: BillMercadoPago = {
    bill: {} as Partial<Bill>,
    user: {} as Partial<UserBill>,
    pay: false,
    id: '',
  };

  counterCodeBill: string = '000000';

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

  public billForm: FormGroup = this.fb.group({
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

    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorFieldsService.emailPattern),
      ],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorFieldsService.celularPattern),
      ],
    ],
    address: ['', [Validators.required]],
    address2: [''],
  });
  ngOnInit(): void {
    this.getUser();
  }

  ngAfterViewInit(): void {
    // const mercadopago = this.Mercadopago.setPublishableKey(
    //   environment.mercadoPago.publicKey
    // );
  }
  loginGuest() {
    this.authService.loginGuest();
  }

  get emailErrorMsg(): string {
    const errors = this.billForm.get('email')?.errors;
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
      this.billForm.get(field)?.invalid && this.billForm.get(field)?.touched
    );
  }

  getBill() {
    const bill$ = this.clientBillService.getClientBill();
    bill$.subscribe((bill: Bill) => {
      this.billMercadoPago.bill = bill;
    });
  }

  getUser() {
    this.user$
      .pipe(
        filter((user: User | null) => user !== null),
        map((user) => user!)
      )
      .subscribe((user: User) => {
        this.billMercadoPago.user.uid = user!.uid;
        !user ? (this.user = false) : (this.user = true);
      });
  }

  submit(): BillMercadoPago {
    this.getBill();
    this.getUser();
    let counterId = Number(this.counterCodeBill);
    counterId++;
    this.counterCodeBill = `0000${counterId}`;

    this.billMercadoPago.bill = {
      ...this.billMercadoPago.bill,
    };
    this.billMercadoPago.user = {
      ...this.billMercadoPago.user,
      ...this.billForm.value,
    };
    this.billMercadoPago = {
      ...this.billMercadoPago,
      pay: false,
      id: this.counterCodeBill,
    };
    this.pay = true;
    this.clientBillService.create(this.billMercadoPago);

    setTimeout(() => this.router.navigate(['/canvas']), 5000);
    return this.billMercadoPago;
  }
}
