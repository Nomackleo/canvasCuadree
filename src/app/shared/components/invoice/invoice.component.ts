import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BillMercadoPago } from 'src/app/models/bill';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  // @Input() invoice$!: Observable<BillMercadoPago[]>;
  @Input() invoice!: BillMercadoPago[];
  @Input() showDetail!: string | null;
  @Output() showInvoiceEmitter = new EventEmitter<BillMercadoPago>();
  @Output() deleteInvoice = new EventEmitter<void>();

  showCardBody = false;
  constructor() {}

  ngOnInit(): void {}

  showInvoice(invoice: BillMercadoPago) {
    this.showInvoiceEmitter.emit(invoice);
  }

  delete() {
    this.deleteInvoice.emit();
  }

}
