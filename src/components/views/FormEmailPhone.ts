import { Form } from './Form';
import { IEvents } from '../base/Events';

export class FormEmailPhone extends Form<any> {
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

    render(data: any): HTMLElement {
        if (data.email !== undefined && this._emailInput) {
            this._emailInput.value = data.email;
        }
        if (data.phone !== undefined && this._phoneInput) {
            this._phoneInput.value = data.phone;
        }
        this.errors = data.errors;
        this.isValid = data.isValid;
        return this._container;
    }
}