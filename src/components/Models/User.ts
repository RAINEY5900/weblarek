import { IEvents } from '../base/Events';
import { TPayment } from '../../types';

interface IUserData {
    payment?: TPayment | null;
    address?: string;
    email?: string;
    phone?: string;
}

export class User {
    private data: IUserData = {};

    constructor(private events?: IEvents) {}

    set(data: IUserData): void {
        this.data = { ...this.data, ...data };
        if (this.events) {
            this.events.emit('user:changed');
        }
    }

    get(): IUserData {
        return this.data;
    }

    clear(): void {
        this.data = {};
        if (this.events) {
            this.events.emit('user:changed');
        }
    }

    validate(): Record<string, string> {
        const errors: Record<string, string> = {};
        if (!this.data.payment) errors.payment = 'Выберите способ оплаты';
        if (!this.data.address) errors.address = 'Введите адрес';
        if (!this.data.email) errors.email = 'Введите email';
        if (!this.data.phone) errors.phone = 'Введите телефон';
        return errors;
    }
}