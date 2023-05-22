// import { Currency } from 'mercadopago/shared/currency';
// import { Phone } from 'mercadopago/shared/phone';

export interface UserBill {
  name: string;
  lastname: string;
  email: string;
  phone?: number | undefined;
  address?: string | undefined;
  uid?: string | undefined;
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
