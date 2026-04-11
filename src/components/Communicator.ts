import { IApi, IOrderResponse, IProductsResponse, IOrder } from '../types';

export class Communicator {
    private _api: IApi;
    
    constructor(api: IApi) {
        this._api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this._api.get<IProductsResponse>("/product/");
    }

    postOrder(order: IOrder): Promise<IOrderResponse> {
        return this._api.post<IOrderResponse>("/order", order);
    }
}