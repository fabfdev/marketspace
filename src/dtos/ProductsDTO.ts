import { UserDTO } from "./UserDTO";

export type ProductsDTO = {
  accept_trade: boolean;
  created_at: string;
  description: string;
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  payment_methods: PaymentMethos[];
  price: number;
  product_images: ProductImages[];
  updated_at: string;
  user_id: string;
  user: UserDTO;
};

export type PaymentMethos = {
  key: string;
  name: string;
};

export type ProductImages = {
  id: string;
  path: string;
};
