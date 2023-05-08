import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { BillService } from 'src/app/core/services/features/bill.service';
import { ClienBillService } from 'src/app/core/services/features/clien-bill.service';
import { PriceService } from 'src/app/core/services/features/price.service';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-modal-price',
  templateUrl: './modal-price.component.html',
  styleUrls: ['./modal-price.component.css']
})
export class ModalPriceComponent {
  private router = inject(Router);
  private billService = inject(BillService);
  private priceService = inject(PriceService);
  private clientBillService = inject(ClienBillService);
  dataBill$!: Observable<Bill>;
  private billSubject = new Subject<Bill>();
  bill$ = this.billSubject.asObservable();
  public priceFrame: string = '';

  ngOnInit(): void {
    this.price();
    this.dataBill$ = this.billService.dataBill$;
    this.getDataBill();
    this.dataBill$.subscribe((bill: Bill) => {
      this.clientBillService.setClientBill(bill);
    });
  }

  ngOnDestroy(): void {
    this.billSubject.unsubscribe();
  }
  price() {
    this.priceService.price();
  }

  getDataBill() {
    this.billService.bills();
    this.dataBill$ = this.billService.dataBill$;
  }

  addCardShopping() {
    
    this.router.navigate(['/card-shopping']);
  }
}
