import { Form } from './Form';
import { IEvents } from '../base/Events';
import { IUserError } from '../../types';

interface IPaymentAddressData {
    payment: string | null;
    address: string;
    errors: IUserError;
    isValid: boolean;
}

export class FormPaymentAddress extends Form<IPaymentAddressData> {
    private _paymentButtons: NodeListOf<HTMLButtonElement>;
    private _addressInput: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._paymentButtons = container.querySelectorAll('.order__payment-button');
        this._addressInput = container.querySelector('input[name="address"]') as HTMLInputElement;

        this._paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.events.emit('payment:changed', { payment: button.value });
            });
        });

        this._addressInput.addEventListener('input', () => {
            this.events.emit('address:changed', { address: this._addressInput.value });
        });
    }

    get container(): HTMLElement {
        return this._container;
    }

    set payment(value: string | null) {
        this._paymentButtons.forEach(button => {
            if (button.value === value) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    set address(value: string) {
        if (this._addressInput) {
            this._addressInput.value = value;
        }
    }

    render(data: IPaymentAddressData): HTMLElement {
        this.payment = data.payment;
        this.address = data.address;
        this.errors = data.errors;
        this.isValid = data.isValid;
        return this._container;
    }
}