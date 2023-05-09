import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ClienBillService } from 'src/app/core/services/features/clien-bill.service';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-card-shopping',
  templateUrl: './card-shopping.component.html',
  styleUrls: ['./card-shopping.component.css']
})
export class CardShoppingComponent implements OnInit{
  private auth: Auth = inject(Auth);
  private router = inject(Router);
  private authService = inject(AuthService);
  private clientBillService = inject(ClienBillService);
  // user$ = authState(this.auth);
  user$ = this.authService.user$;

  isAuth: boolean = false;

  dataBill$!: Observable<Bill>;

  constructor() {}

  ngOnInit(): void {
    // this.dataBill$ = this.billService.dataBill$;
    this.getDataBill();
  }

  getDataBill() {
    this.dataBill$ = this.clientBillService.getClientBill();
  }

  loginGuest() {
    this.authService.loginGuest();
  }
}
