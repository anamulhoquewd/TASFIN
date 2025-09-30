export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  role: "super_admin" | "admin";
  avatar?: {
    alt: string;
    url: string;
  };
}

export interface ICustomer {
  _id: string;
  name: string;
  phone: string;
  address: string;
}
