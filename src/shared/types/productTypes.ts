export type Product = {
  additionalInfo: null;
  category: string;
  code: string;
  description: string;
  id: string;
  image: string;
  measureUnit: string;
  name: string;
  order: number;
  price: number;
  productId: string;
  tags: string[];
  weight: number;
};

export type FullProduct = Product & {
  stopped: boolean;
};
