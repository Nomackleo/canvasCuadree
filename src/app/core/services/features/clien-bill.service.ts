import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bill, BillMercadoPago } from 'src/app/models/bill';

@Injectable({
  providedIn: 'root'
})
export class ClienBillService {
  firestore = inject(Firestore);

  private invoiceCollection!: CollectionReference<DocumentData>;

  private clientBill: BehaviorSubject<Bill> = new BehaviorSubject<Bill>({
    print: '',
    canvas: '',
    size: '',
    value: 0,
  });

  bill: Partial<Bill> = {};
  private mercadoPagoBill: BehaviorSubject<BillMercadoPago> =
    new BehaviorSubject<BillMercadoPago>({
      bill: {
        print: '',
        canvas: '',
        size: '',
        value: 0,
      },
      user: {
        name: '',
        lastname: '',
        email: '',
        phone: undefined,
        address: '',
      },
      // timestamp: Date,
      pay: false,
      id: '',
    });

  constructor() {
    this.invoiceCollection = collection(this.firestore, 'invoice');
  }

  setClientBill(clientBill: Bill) {
    this.clientBill.next(clientBill);
  }

  getClientBill(): Observable<Bill> {
    return this.clientBill.asObservable();
  }

  getAll$() {
    return collectionData(this.invoiceCollection, {
      idField: 'id',
    }) as Observable<BillMercadoPago[]>;
  }

  get(id: string) {
    const invoiceDocumentRef = doc(this.firestore, `invoice/${id}`);
    return docData(invoiceDocumentRef, { idField: 'id' });
  }

  create(invoice: BillMercadoPago) {
    console.log(`create method od service: ${invoice}`);
    return addDoc(this.invoiceCollection, invoice);
  }

  update(invoice: BillMercadoPago) {
    const invoiceDocumentRef = doc(this.firestore, `invoice/${invoice.id}`);
    return updateDoc(invoiceDocumentRef, { ...invoice });
  }

  delete(id: string) {
    const invoiceDocumentRef = doc(this.firestore, `invoice/${id}`);
    return deleteDoc(invoiceDocumentRef);
  }
}
