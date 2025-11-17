import type {
  OrderListResponse,
  OrderRegisterPayload,
  OrderRegisterResponse,
  OrderUpdatePayload,
} from "../interfaces/orders";
import { api } from "./api";

const BASE_URL = "/api/v1/orders";

export const OrderService = {
  registerOrder: async (
    orderToRegister: OrderRegisterPayload
  ): Promise<OrderRegisterResponse> => {
    const response = await api.post(`${BASE_URL}`, orderToRegister);
    return response.data;
  },

  listOrders: async (): Promise<OrderListResponse> => {
    const response = await api.get(`${BASE_URL}`);
    return response.data;
  },

  updateOrder: async (
    orderToUpdate: OrderUpdatePayload
  ): Promise<OrderRegisterResponse> => {
    const response = await api.put(`${BASE_URL}`, orderToUpdate);
    return response.data;
  },

  deleteOrder: async (orderIdToDelete: string): Promise<number> => {
    const response = await api.delete(`${BASE_URL}/${orderIdToDelete}`);
    return response.status;
  },
};
