export interface Product {
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
}

export interface Category {
  description: string;
  id: string;
  image: string;
  name: string;
  order: number;
  organization: string;
  tags: string[];
}

export interface ProductsRequestModel {
  organization: string;
}

export interface ProductsResponseModel {
  products: Product[];
  categoryes: Category[];
}
