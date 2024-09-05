import {axiosInstance} from '../../../shared/api/axios';
import {CartAddResponseModel, CartAddRequestModel} from '../types/cartAddTypes';
import {
  CartRemoveItemRequestModel,
  CartRemoveItemResponseModel,
} from '../types/cartRemoveItemTypes';
import {
  CartAmountRequestModel,
  CartAmountResponseModel,
} from '../types/cartAmountTypes';
import {
  CartAllItemsRequestModel,
  CartAllItemResponseModel,
} from '../types/cartAllItemsTypes';
import {
  CartDeleteAllItemsRequestModel,
  CartDeleteAllItemsResponseModel,
} from '../types/cartDeleteAllTypes';

export const addApi = (data: CartAddRequestModel) => {
  return axiosInstance.post<CartAddResponseModel>('/cart/add', data);
};

export const removeApi = (data: CartRemoveItemRequestModel) => {
  return axiosInstance.delete<CartRemoveItemResponseModel>('/cart/removeOne', {
    data,
  });
};

export const amountApi = (
  data: CartAmountRequestModel,
  signal?: AbortSignal,
) => {
  return axiosInstance.post<CartAmountResponseModel>('/cart/amount', data, {
    signal,
  });
};

export const getAllItemsApi = (data: CartAllItemsRequestModel) => {
  return axiosInstance.get<CartAllItemResponseModel>('/cart/getAll', {
    params: data,
  });
};

export const deleteAllItemsApi = (data: CartDeleteAllItemsRequestModel) => {
  return axiosInstance.delete<CartDeleteAllItemsResponseModel>(
    '/cart/deleteAll',
    {
      data: data,
    },
  );
};
