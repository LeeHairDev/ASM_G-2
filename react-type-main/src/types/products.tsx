export interface Iproduct {
  _id?: string | number;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}
