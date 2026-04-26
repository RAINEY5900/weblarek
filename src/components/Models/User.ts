import { IEvents } from "../base/Events";

export class User {
    private data: any = {};

    constructor(private events?: IEvents) {}

    set(data: any): void {
        this.data = { ...this.data, ...data };
        if (this.events) {
            this.events.emit('user:changed');
        }
    }

    get(): any {
        return this.data;
    }

    clear(): void {
        this.data = {};
        if (this.events) {
            this.events.emit('user:changed');
        }
    }

    validate(): any {
        const errors: any = {};
        if (!this.data.payment) errors.payment = 'Выберите способ оплаты';
        if (!this.data.address) errors.address = 'Введите адрес';
        if (!this.data.email) errors.email = 'Введите email';
        if (!this.data.phone) errors.phone = 'Введите телефон';
        return errors;
    }
}