import { Api } from '../base/Api';
import { IOrderRequest, IOrderResponse, IProducts } from '../../types';

export class UserApi {
    constructor(private api: Api) {}

    async get(): Promise<IProducts> {
        return this.api.get('/product');
    }

    async post(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post('/order', order);
    }
}