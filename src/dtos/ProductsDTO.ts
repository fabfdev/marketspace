export type ProductsDTO = {
  accept_trade: boolean;
  created_at: string;
  description: string;
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  payment_methods: string[];
  price: number;
  product_images: string[];
  updated_at: string;
  user_id: string;
};
