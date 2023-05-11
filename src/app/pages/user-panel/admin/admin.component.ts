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
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 0;
  pageSize = 2;
  totalPages: number = 0;
  pages: number[] = [];

  private subscriptions = new Subscription();
  constructor() {}

  /**
   * TODO: fix pagination
   */
  ngOnInit(): void {
    this.allInvoices$ = this.clientBillService.getAll$();
    this.allInvoices$.subscribe((invoices: BillMercadoPago[]) => {
      this.allInvoices = invoices;
      this.totalItems = invoices.length;
      this.calculatePages();
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      invoices.slice(start, end);
      console.log(this.totalItems, this.totalPages);
    });
  }
  // allInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  calculatePages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  showInvoice(invoice: BillMercadoPago) {
    this.showDetail = invoice.id;
  }

  onPageChange(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.currentPage = pageNumber;
    }
  }

  ngOnDestroy(): void {
    // Desuscribirse de todas las suscripciones juntas.
    this.subscriptions.unsubscribe();
  }
}
