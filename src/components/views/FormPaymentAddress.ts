import { Form } from './Form';
import { IEvents } from '../base/Events';

export class FormPaymentAddress extends Form<any> {
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

    render(data: any): HTMLElement {
        if (data.payment !== undefined) {
            this._paymentButtons.forEach(button => {
                if (button.value === data.payment) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        }
        if (data.address !== undefined && this._addressInput) {
            this._addressInput.value = data.address;
        }
        this.errors = data.errors;
        this.isValid = data.isValid;
        return this._container;
    }
}