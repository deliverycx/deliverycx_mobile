import {Product} from '../../../shared/types/productTypes';

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
