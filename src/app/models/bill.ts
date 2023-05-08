// import { Currency } from 'mercadopago/shared/currency';
// import { Phone } from 'mercadopago/shared/phone';

export interface UserBill {
  name: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  phone: number | undefined;
  address: string | undefined;
  uid: string | undefined;
}
export interface Bill {
  print: string;
  canvas: string;
  size: string;
  value: number | undefined;
}

export interface BillMercadoPago {
  bill: Partial<Bill>;
  user: Partial<UserBill>;
  // timestamp?: Timestamp;
  pay: boolean;
  id: string;
  // currency_id?: Currency | undefined;
}
