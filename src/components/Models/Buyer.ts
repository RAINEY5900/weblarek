import { IBuyer, ValidationErrors, TPayment } from '../../types';

export class Buyer {
    private data: IBuyer = {
        payment: null,
        email: "",
        phone: "",
        address: "",
    };

    updateInformation(data: Partial<IBuyer>): void {
        this.data = { ...this.data, ...data };
    }

    getInformation(): IBuyer {
        return this.data;
    }

    validateInformation(): ValidationErrors {
        const result: ValidationErrors = {};

        if (!this.data.payment) {
            result.payment = "Не выбран способ оплаты";
        }

        if (!this.data.email.trim()) {
            result.email = "Укажите email";
        }

        if (!this.data.phone.trim()) {
            result.phone = "Укажите телефон";
        }

        if (!this.data.address.trim()) {
            result.address = "Укажите адрес доставки";
        }

        return result;
    }

    isValid(): boolean {
        return Object.keys(this.validateInformation()).length === 0;
    }

    clearInformation(): void {
        this.data = {
            payment: null,
            email: "",
            phone: "",
            address: "",
        };
    }
}