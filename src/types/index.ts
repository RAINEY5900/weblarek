export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// ========== ДОБАВЬТЕ ЭТО ==========

// Тип способа оплаты
export type TPayment = 'card' | 'cash';

// Интерфейс товара
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

// Интерфейс покупателя
export interface IBuyer {
    payment: TPayment | string;  // string для совместимости с вашей реализацией
    email: string;
    phone: string;
    address: string;
}

// Интерфейс заказа для отправки на сервер
export interface IOrder {
    payment: TPayment | string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

// Ответ сервера после заказа
export interface IOrderResponse {
    id: string;
    total: number;
}

// Ответ сервера при получении товаров
export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

// Тип для ошибок валидации
export interface IErrorsBuyer {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
}