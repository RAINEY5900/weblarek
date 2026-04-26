import { Form } from './Form';
import { IEvents } from '../base/Events';
import { IUserError } from '../../types';

interface IEmailPhoneData {
    email: string;
    phone: string;
    errors: IUserError;
    isValid: boolean;
}

export class FormEmailPhone extends Form<IEmailPhoneData> {
    private _emailInput: HTMLInputElement;
    private _phoneInput: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
        this._phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;

        this._emailInput.addEventListener('input', () => {
            this.events.emit('email:changed', { email: this._emailInput.value });
        });

        this._phoneInput.addEventListener('input', () => {
            this.events.emit('phone:changed', { phone: this._phoneInput.value });
        });
    }

    get container(): HTMLElement {
        return this._container;
    }

    set email(value: string) {
        if (this._emailInput) {
            this._emailInput.value = value;
        }
    }

    set phone(value: string) {
        if (this._phoneInput) {
            this._phoneInput.value = value;
        }
    }

    render(data: IEmailPhoneData): HTMLElement {
        this.email = data.email;
        this.phone = data.phone;
        this.errors = data.errors;
        this.isValid = data.isValid;
        return this._container;
    }
}