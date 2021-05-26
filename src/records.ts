export interface Customer {
  id: string;
  name: string;
  address: string;
}

export interface InputOrder {
  quantity: number;
  price: number;
}

export interface OrderReport {
  item: string;
  quantity: number;
  price: number;
  revenue: number;
}

export interface InputRecord {
  id: number;
  vendor: string;
  date: string;
  customer: Customer;
  order: { [key: string]: InputOrder };
}

export interface OrdersReport {
  id: number;
  vendor: string;
  date: string;
  customer: string;
  order: OrderReport[];
}

export interface Report {
  customers: Customer[];
  orders: OrdersReport[];
}
