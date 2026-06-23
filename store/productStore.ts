
import { create } from 'zustand';

export interface Product {
  id: string;

  name: string;

  image?: string;

  location?: {
    latitude: number;
    longitude: number;
  };

  contact?: {
    name: string;
    phone?: string;
  };

  calendarEventId?: string;
}

interface ProductStore {
  products: Product[];

  addProduct: (
    product: Product
  ) => void;

  deleteProduct: (
    id: string
  ) => void;

  setProducts: (
    products: Product[]
  ) => void;

  clearProducts: () => void;
}

export const useProductStore =
  create<ProductStore>((set) => ({
    products: [],

    addProduct: (product) =>
      set((state) => ({
        products: [
          ...state.products,
          product,
        ],
      })),

    deleteProduct: (id) =>
      set((state) => ({
        products:
          state.products.filter(
            (p) => p.id !== id
          ),
      })),

    setProducts: (products) =>
      set({ products }),

    clearProducts: () =>
      set({ products: [] }),
  }));

