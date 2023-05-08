import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
  @Input() bill$!: Observable<Bill>;
  @Output() billEmitter = new EventEmitter<Bill>();

  selectBill(bill: Bill) {
    this.billEmitter.emit(bill);
  }

}
