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
        this._paymentButtons = container.querySelectorAll('.order__buttons .button_alt');
        this._addressInput = container.querySelector('input[name="address"]') as HTMLInputElement;

        this._paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                const paymentValue = button.getAttribute('value') || (button.name === 'card' ? 'card' : 'cash');
                this.events.emit('payment:changed', { payment: paymentValue });
            });
        });

        this._addressInput.addEventListener('input', () => {
            this.events.emit('address:changed', { address: this._addressInput.value });
        });
    }

    set payment(value: string | null) {
        this._paymentButtons.forEach(button => {
            const buttonValue = button.getAttribute('value') || (button.name === 'card' ? 'card' : 'cash');
            if (buttonValue === value) {
                button.classList.add('button_alt-active');
            } else {
                button.classList.remove('button_alt-active');
            }
        });
    }

    set address(value: string) {
        if (this._addressInput) {
            this._addressInput.value = value;
        }
    }
}