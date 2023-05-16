import { Component, OnInit, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ClienBillService } from 'src/app/core/services/features/clien-bill.service';
import { BillMercadoPago } from 'src/app/models/bill';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  private clientBillService = inject(ClienBillService);
  private authService = inject(AuthService);

  private auth: Auth = this.authService.auth;

  allInvoices$!: Observable<BillMercadoPago[]>;
  user$ = authState(this.auth).pipe(
    filter((user) => user !== null),
    map((user) => user!)
  );

  showDetail: string | null = null;

  allInvoices: BillMercadoPago[] = [];
  page: number = 1;
  pageSize = 12;

  ngOnInit(): void {
    this.allInvoices$ = this.clientBillService.getAll$();
    this.getDisplayedInvoices();
  }

  getDisplayedInvoices() {
    return combineLatest([this.user$, this.allInvoices$])
      .pipe(
        map(([user, invoices]) => {
          return invoices.forEach((invoice) => {
            if (invoice.user.uid === user.uid) {
              this.allInvoices.push(invoice);
            }
          });
        })
      )
      .subscribe();
  }

  showInvoice(invoice: BillMercadoPago) {
    this.showDetail = invoice.id;
  }
}
