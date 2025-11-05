export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type RequiredExcept<T, K extends keyof T> = Required<T> & Pick<T, K>;
