import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserBill } from 'src/app/models/bill';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore = inject(Firestore);

  private usersCollection!: CollectionReference<DocumentData>;

  private user: BehaviorSubject<UserBill> = new BehaviorSubject<UserBill>({
    name: '',
    lastname: '',
    email: '',
    phone: undefined,
    address: '',
    uid: '',
  });

  constructor() {
    this.usersCollection = collection(this.firestore, 'users');
  }

  setUser(user: UserBill) {
    this.user.next(user);
  }

  getUserBill(): Observable<UserBill> {
    return this.user.asObservable();
  }

  getAll$() {
    return collectionData(this.usersCollection, {
      idField: 'id',
    }) as Observable<UserBill[]>;
  }

  get(id: string) {
    const userDocumentRef = doc(this.firestore, `user/${id}`);
    return docData(userDocumentRef, { idField: 'id' });
  }

  create(user: UserBill) {
    console.log(`create method od service: ${user}`);
    return addDoc(this.usersCollection, user);
  }

  update(user: UserBill) {
    const userDocumentRef = doc(this.firestore, `user/${user.uid}`);
    return updateDoc(userDocumentRef, { ...user });
  }

  delete(id: string) {
    const userDocumentRef = doc(this.firestore, `user/${id}`);
    return deleteDoc(userDocumentRef);
  }
}
