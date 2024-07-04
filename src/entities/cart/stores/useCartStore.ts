import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type CartItem = {
  count: number;
};

type CartItemReturnValue = {
  productId: string;
  count: number;
};

type State = {
  data: Record<string, CartItem>;
};

type Actions = {
  updateItem: (productId: string, count: number) => void;
  deleteItem: (productId: string) => void;
  getCountById: (productId: string) => number;
  getAllItems: () => CartItemReturnValue[];
  clearAllItems: () => void;
};

export const useCartStore = create<State & Actions>()(
  immer((set, get) => ({
    data: {},
    updateItem: (productId: string, count: number) => {
      const {deleteItem} = get();

      if (count < 1) {
        deleteItem(productId);
      } else {
        set(({data}) => {
          if (data[productId]) {
            data[productId].count = count;
          } else {
            data[productId] = {
              count,
            };
          }
        });
      }
    },
    deleteItem: (productId: string) => {
      set(({data}) => {
        delete data[productId];
      });
    },
    getCountById: (productId: string) => {
      return get().data[productId]?.count ?? 0;
    },
    getAllItems: () => {
      const {data} = get();

      return Object.entries(data).map(([productId, {count}]) => ({
        productId,
        count,
      }));
    },
    clearAllItems: () => {
      set({
        data: {},
      });
    },
  })),
);
