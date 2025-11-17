import type { BasicResponse } from "./common";
import type { PartialExcept, RequiredExcept } from "./utils";

export enum OrderStatusType {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CONCLUDED = "CONCLUDED",
  CANCELED = "CANCELED",
}

export interface OrderItemType {
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderInterface {
  id: string;
  customerName: string;
  customerAddress: string;
  date: string;
  status: OrderStatusType;
  total: number;
  items: OrderItemType[];

  totalPrice?: string; // only frontend
}

export type OrderFormBaseType = RequiredExcept<OrderInterface, "id">;

export type OrderRegisterPayload = Omit<OrderInterface, "id">;

export type OrderUpdatePayload = PartialExcept<OrderInterface, "id">;

// Resonses types:
export type OrderRegisterResponse = BasicResponse<OrderInterface>;
export type OrderUpdateResponse = BasicResponse<OrderInterface>;
export type OrderListResponse = BasicResponse<OrderInterface[]>;
