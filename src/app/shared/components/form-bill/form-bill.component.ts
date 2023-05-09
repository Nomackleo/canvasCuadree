import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ErrorsComponent } from '../errors/errors.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ClienBillService } from 'src/app/core/services/features/clien-bill.service';
import { ValidatorFieldsService } from 'src/app/core/services/auth/validator-fields.service';
import { FirebaseCodeErrorService } from 'src/app/core/services/auth/firebase-code-error.service';
import { Bill, BillMercadoPago, UserBill } from 'src/app/models/bill';
import { ErrorMessage } from 'src/app/models/error-message';

@Component({
  selector: 'app-form-bill',
  templateUrl: './form-bill.component.html',
  styleUrls: ['./form-bill.component.css']
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
  declare Mercadopago: any;

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
    celular: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorFieldsService.celularPattern),
      ],
    ],
    address: ['', [Validators.required]],
    address2: [''],
  });
  ngOnInit(): void {}

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

  submit(): BillMercadoPago {
    this.getBill();
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
    this.clientBillService.create(this.billMercadoPago);
    return this.billMercadoPago;
  }
}
