export interface Customer {
  email: string;
  id: string;
  name: string;
  role: string;
}

export interface ListZellerCustomersResponse {
  data: {
    listZellerCustomers: {
      items: Customer[];
    };
  };
}
