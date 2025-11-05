import type { BasicResponse } from "./common";
import type { PartialExcept, RequiredExcept } from "./utils";

export interface ProductInterface {
  name: string;
  price: number;
  id: string;
}

export type ProductFormBaseType = RequiredExcept<ProductInterface, "id">;

export type ProductRegisterPayload = Omit<ProductInterface, "id">;

export type ProductUpdatePayload = PartialExcept<ProductInterface, "id">;

// Resonses types:

export type ProductRegisterResponse = BasicResponse<ProductInterface>;
export type ProductUpdateResponse = BasicResponse<ProductInterface>;
export type ProductListResponse = BasicResponse<ProductInterface[]>;
