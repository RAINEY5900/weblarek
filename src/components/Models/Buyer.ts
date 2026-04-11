import { IBuyer, IErrorsBuyer, TPayment } from '../../types';  // ← ../../types

/**
 * Покупатель.
 */
export class Buyer {
    private _data: IBuyer = {
        payment: "card" as TPayment,  // Значение по умолчанию
        email: "",
        phone: "",
        address: "",
    };

    /**
     * Обновить информацию о покупателе.
     * @param data данные для обновления.
     */
    updateInformation(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data };
    }

    /**
     * Получить информацию о покупателе.
     * @returns данные покупателя.
     */
    getInformation(): IBuyer {
        return this._data;
    }

    /**
     * Валидация информации о покупателе.
     * @returns объект с проблемными полями.
     */
    validateInformation(): IErrorsBuyer {
        const result: IErrorsBuyer = {};

        if (!this._data.payment) {
            result.payment = "Не выбран способ оплаты";
        }

        if (!this._data.email.trim()) {
            result.email = "Укажите email";
        }

        if (!this._data.phone.trim()) {
            result.phone = "Укажите телефон";
        }

        if (!this._data.address.trim()) {
            result.address = "Укажите адрес доставки";
        }

        return result;
    }

    /**
     * Проверить, валидны ли данные
     */
    isValid(): boolean {
        return Object.keys(this.validateInformation()).length === 0;
    }

    /**
     * Очистить информацию о покупателе.
     */
    clearInformation(): void {
        this._data = {
            payment: "card",
            email: "",
            phone: "",
            address: "",
        };
    }
}