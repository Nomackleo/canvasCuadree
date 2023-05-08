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

  // // Create invoice reference
  // invoiceRef<T = Bill | BillMercadoPago>(billId: string) {
  //   const billCol = collection(
  //     this.firestore,
  //     'invoice'
  //   ) as CollectionReference<T>;
  //   return doc<T>(billCol, billId);
  // }

  // // Creaet a invoice observable
  // invoice$(invoiceId: string) {
  //   const ref = this.invoiceRef<ResumeSnap>(invoiceId);
  //   const invoice$ = docData(ref, { idField: 'id' });
  //   return invoice$.pipe(
  //     withLatestFrom(this.experiences$(invoiceId)),
  //     map(([invoice, experiencesSnap]) => {
  //       return {
  //         ...invoice,
  //         experiences: this.setExperiencesDefaults(experiencesSnap),
  //       };
  //     })
  //   );
  // }

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
