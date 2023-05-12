import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription, filter, map } from 'rxjs';
import { ClienBillService } from 'src/app/core/services/features/clien-bill.service';
import { BillMercadoPago } from 'src/app/models/bill';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private clientBillService = inject(ClienBillService);
  allInvoices$!: Observable<BillMercadoPago[]>;

  showDetail: string | null = null;

  allInvoices: BillMercadoPago[] = [];
  page: number = 1;
  itemsPerPage: number = 2;
  pageSize = 20;

  private subscriptions = new Subscription();
  constructor() {}

  /**
   * TODO: fix pagination
   */
  ngOnInit(): void {
    this.allInvoices$ = this.clientBillService.getAll$();
    this.getDisplayedInvoices();
  }
  getDisplayedInvoices() {
    return this.allInvoices$
      .pipe(
        map((invoices: BillMercadoPago[]) => {
          this.allInvoices = invoices;
        })
      )
      .subscribe();
  }

  showInvoice(invoice: BillMercadoPago) {
    this.showDetail = invoice.id;
  }

  ngOnDestroy(): void {
    // Desuscribirse de todas las suscripciones juntas.
  }
}
