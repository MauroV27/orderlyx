import type {
  ProductListResponse,
  ProductRegisterPayload,
  ProductRegisterResponse,
  ProductUpdatePayload,
} from "../interfaces/products";
import { api } from "./api";

const BASE_URL = "/api/v1/products";

export const ProductService = {
  registerProduct: async (
    productToRegister: ProductRegisterPayload
  ): Promise<ProductRegisterResponse> => {
    const response = await api.post(`${BASE_URL}`, productToRegister);
    return response.data;
  },

  listProducts: async (): Promise<ProductListResponse> => {
    const response = await api.get(`${BASE_URL}`);
    return response.data;
  },

  updateProduct: async (
    productToUpdate: ProductUpdatePayload
  ): Promise<ProductRegisterResponse> => {
    const response = await api.put(`${BASE_URL}`, productToUpdate);
    return response.data;
  },

  deleteProduct: async (productIdToDelete: string): Promise<number> => {
    const response = await api.delete(`${BASE_URL}/${productIdToDelete}`);
    return response.status;
  },
};
